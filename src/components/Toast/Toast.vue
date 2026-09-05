<script setup lang="ts">
/**
 * Headless toast component backed by the native `<dialog>` element.
 *
 * Opens with `showModal()` on mount (the rest of the page becomes inert
 * while the toast is visible — intentional modal behavior) and
 * auto-dismisses after `autoCloseSeconds` (default 5; `0` or a
 * non-finite value disables auto-close; the value is reactive). An
 * accessible close button dismisses it early. The visual comes from the
 * co-located `Toast.module.css` (token-driven); `.c-toast` is applied
 * as an unscoped design-system hook. All native dialog attributes
 * (aria-*, onCancel, onClose, etc.) fall through to the root
 * `<dialog>` — except `open`, which is stripped so the dialog can be
 * opened imperatively via `showModal()`. Reopen by remounting.
 *
 * **Accessibility — required:** the dialog must be given an accessible
 * name by the consumer, because its content is arbitrary slot text.
 * Pass `aria-label` (or `aria-labelledby` pointing at visible text)
 * via fallthrough:
 *
 * @usage
 * ```html
 * <CToast variant="success" aria-label="Changes saved">Changes saved</CToast>
 * <CToast variant="error" :auto-close-seconds="0" aria-label="Error">Something went wrong</CToast>
 * ```
 */
import { computed, onBeforeUnmount, onMounted, ref, useAttrs, watch } from 'vue'
import type { ToastEmits, ToastProps } from './Toast'
import { closeIcon, getToastIcon } from './Toast'
import CIcon from '../Icon/Icon.vue'
import styles from './Toast.module.css'

const props = withDefaults(defineProps<ToastProps>(), {
  variant: 'info',
  autoCloseSeconds: 5,
})

const emit = defineEmits<ToastEmits>()

/** The native `open` attribute is ours to manage — never fall it through. */
defineOptions({ inheritAttrs: false })

const attrs = useAttrs()
const dialogAttrs = computed(() => {
  const rest = { ...attrs }
  delete rest.open
  return rest
})

const dialogEl = ref<HTMLDialogElement | null>(null)
let timer: ReturnType<typeof setTimeout> | undefined

/** Native `close` event: cancel the pending timer, then notify. */
function handleNativeClose(event: Event): void {
  clearTimer()
  emit('close', event)
}

/** Close button: closes the dialog; the native event does the rest. */
function handleCloseClick(): void {
  dialogEl.value?.close()
}

function clearTimer(): void {
  if (timer !== undefined) {
    clearTimeout(timer)
    timer = undefined
  }
}

/** (Re)schedule auto-dismiss; a value of `0` (or non-finite) disables it. */
function scheduleAutoClose(): void {
  clearTimer()
  const seconds = props.autoCloseSeconds
  if (seconds > 0 && Number.isFinite(seconds)) {
    timer = setTimeout(() => {
      dialogEl.value?.close()
    }, seconds * 1000)
  }
}

onMounted(() => {
  const dialog = dialogEl.value
  if (dialog && !dialog.open) {
    dialog.showModal()
  }
  scheduleAutoClose()
})

/** React to `autoCloseSeconds` changes: reschedule (or clear) the timer. */
watch(() => props.autoCloseSeconds, scheduleAutoClose)

onBeforeUnmount(clearTimer)
</script>

<template>
  <dialog
    ref="dialogEl"
    v-bind="dialogAttrs"
    :class="['c-toast', styles.toast]"
    :data-variant="props.variant"
    @close="handleNativeClose"
  >
    <div :class="styles.content">
      <CIcon :icon="getToastIcon(props.variant)" />
      <slot />
    </div>
    <div :class="styles.close">
      <button type="button" aria-label="Close toast" @click="handleCloseClick">
        <CIcon :icon="closeIcon" />
      </button>
    </div>
  </dialog>
</template>

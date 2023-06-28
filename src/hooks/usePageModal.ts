import { ref } from 'vue'
import type PageModal from '@/components/page-modal/page-modal.vue'
type CallbackFnType = (data?: any) => void
function usePageModal(newCallback?: CallbackFnType, editCallback?: CallbackFnType) {
  const modalRef = ref<InstanceType<typeof PageModal>>()
  function handleEditClick(itemData: any) {
    modalRef.value?.setdialogTrue(itemData)
    if (editCallback) editCallback(itemData)
  }
  function handleNewClick() {
    modalRef.value?.setdialogTrue()
    if (newCallback) newCallback()
  }
  return {
    modalRef,
    handleEditClick,
    handleNewClick
  }
}

export default usePageModal

import useLoginStore from '@/store/login'
function usePermission(permissionId: string) {
  const loginStore = useLoginStore()
  const { permissions } = loginStore
  return Boolean(permissions.find((item) => item.includes(permissionId)))
}
export default usePermission

/**
 * 下载Blob文件
 * @param blob
 * @param fileName
 */
export const downloadBlobFile = (blob: Blob, fileName: string) => {
  const aLink = document.createElement('a')
  aLink.download = fileName
  aLink.href = URL.createObjectURL(blob)
  aLink.click()
  document.removeChild(aLink)
}

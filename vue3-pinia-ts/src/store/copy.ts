import { defineStore } from 'pinia'
import { useIndexStore } from '.'
import { useContextMenuStore } from './contextmenu'
import { deepCopy } from '@/utils/utils'
import { Ref, ref } from 'vue'
import { Component } from '@/types/drag'
import generateID from '@/utils/generateID'
import { ElMessage } from 'element-plus'

const indexStore = useIndexStore()
const ContextMenuStore = useContextMenuStore()

export const useCopyStore = defineStore('copy', () => {
  const copyDataValue = ref<{
    data: Component | undefined | null
    index: number | null
  }>()
  let isCut = ref(false)
  function copy() {
    if (!indexStore.curComponent) {
        ElMessage.warning('请选择组件')
      return
    }

    // 如果有剪切的数据，需要先还原
    restorePreCutData()
    copyData()

    isCut.value = false
  }
  function paste(isMouse: boolean) {
    if (!copyDataValue.value?.data) {
        ElMessage.warning('请选择组件')
      return
    }

    const data = copyDataValue.value!.data

    if (isMouse) {
      data!.style.top = ContextMenuStore.menuTop
      data!.style.left = ContextMenuStore.menuLeft
    } else {
      data!.style.top = Number(data!.style.top) + 10
      data!.style.left = Number(data!.style.left) + 10
    }
    indexStore.addComponent(deepCopyHelper(data as Component))
    // store.commit('addComponent', { component: deepCopyHelper(data) })
    if (isCut.value) {
      copyDataValue.value!.data = null
    }
  }

  function cut() {
    if (!indexStore.curComponent) {
        ElMessage.warning('请选择组件')
      return
    }

    // 如果重复剪切，需要恢复上一次剪切的数据
    restorePreCutData()
    copyData()

    indexStore.removecurComponent()
    isCut.value = true
  }
  // 恢复上一次剪切的数据
  function restorePreCutData() {
    if (isCut.value && copyDataValue.value?.data) {
      const data = deepCopy(copyDataValue.value!.data)
      const index = copyDataValue.value!.index
      indexStore.addComponent(data, index)
      if (
        indexStore.curComponentIndex !== null &&
        indexStore.curComponentIndex >= (index as number)
      ) {
        // 如果当前组件索引大于等于插入索引，需要加一，因为当前组件往后移了一位
        indexStore.curComponentIndex++
      }
    }
  }
  function copyData() {
    copyDataValue.value = {
      data: deepCopy(indexStore.curComponent),
      index: indexStore.curComponentIndex
    }
    isCut.value = false
  }

  function deepCopyHelper(data: Component) {
    const result = deepCopy(data)
    result.id = generateID()
    // if (result.component === 'Group') {
    //     result.propValue.forEach((component, i) => {
    //         result.propValue[i] = deepCopyHelper(component)
    //     })
    // }

    return result
  }

  return { copyData, restorePreCutData, copy, paste, cut }
})

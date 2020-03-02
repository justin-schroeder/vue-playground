import axios from 'axios'
import { ref, watch } from '@vue/composition-api'

export default function (url, delay) {
  const data = ref({})
  const isPending = ref(true)
  const error = ref(null)

  const fetch = () => {
    isPending.value = true
    axios.get(url.value)
      .then(response => {
        error.value = null
        data.value = response.data
        isPending.value = false
      })
      .catch(error => {
        error.value = error
        isPending.value = false
      })
  }

  watch(url, () => {
    setTimeout(fetch, delay)
  })

  return {
    isPending,
    data,
    refresh: fetch,
    error,
  }
}
import axios from 'axios'
import { ref, watch } from '@vue/composition-api'

export default function(url) {
  const data = ref(null)
  const isPending = ref(true)
  const error = ref(null)

  watch(url, fetch)

  return {
    data, isPending, error, fetch
  }

  function fetch() {
    isPending.value = true;
    axios.get(url)
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
}
import { ref, computed } from 'vue'

export function useSort(data: { value: any[] }) {
	const selectedSort = ref()
	const sortDesc = ref(false)

	const sortedData = computed(() => {
		if (!selectedSort.value) return data.value

		return data.value.slice().sort((a: { [x: string]: any }, b: { [x: string]: any }) => {
			const fieldA = a[selectedSort.value]
			const fieldB = b[selectedSort.value]
			return (fieldA > fieldB ? 1 : -1) * (sortDesc.value ? -1 : 1)
		})
	})

	const sortBy = (field: any) => {
		if (selectedSort.value === field) {
			sortDesc.value = !sortDesc.value
		} else {
			selectedSort.value = field
			sortDesc.value = false
		}
	}

	return {
		selectedSort,
		sortDesc,
		sortedData,
		sortBy,
	}
}

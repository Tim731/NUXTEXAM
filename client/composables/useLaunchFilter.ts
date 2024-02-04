import { ref, computed } from 'vue'

export function useLaunchFilter(allLaunches: any[]) {
	const selectedYear = ref(null)

	const filteredLaunches = computed(() => {
		if (!selectedYear.value) {
			return allLaunches
		}

		return allLaunches.filter((launch) => {
			const launchYear = new Date(launch.launch_date_utc).getFullYear()
			return launchYear === selectedYear.value
		})
	})

	const availableYears = computed(() => {
		const years = new Set()
		allLaunches.forEach((launch) => {
			const launchYear = new Date(launch.launch_date_utc).getFullYear()
			years.add(launchYear)
		})
		return Array.from(years)
	})

	return {
		selectedYear,
		filteredLaunches,
		availableYears,
	}
}

<template>
	<div>
		<v-app>
			<v-container>
				<h1 class="display-1 mb-5">SpaceX Launches</h1>
				<v-row>
					<!-- Filter by Year -->
					<v-col cols="12" md="3">
						<v-select
							v-model="selectedYear"
							:items="availableYears"
							label="Filter by Year"
							@change="filterLaunches"
						/>
					</v-col>
					<v-col cols="12" md="3">
						<v-btn @click="clearFilter">Clear Filter</v-btn>
					</v-col>

					<!-- Sorting Buttons -->
					<v-col cols="12" md="6" class="text-right">
						<v-btn-toggle v-model="sortDirection" :mandatory="true">
							<v-btn @click="sortBy('launch_date_utc')">
								<v-icon start icon="mdi-sort-ascending" />
								Ascending
							</v-btn>
							<v-btn @click="sortBy('launch_date_utc')">
								<v-icon start icon="mdi-sort-descending" />
								Descending
							</v-btn>
						</v-btn-toggle>
					</v-col>
				</v-row>
				<v-row>
					<v-col v-for="launch in sortedData" :key="launch.id" cols="12" md="4">
						<v-card class="mb-3 py-3 h-100">
							<v-card-title class="headline mb-1">{{ launch.mission_name }}</v-card-title>
							<v-card-subtitle>
								<strong>Launch Date:</strong>
								{{ launch.launch_date_utc }}
							</v-card-subtitle>
							<v-card-subtitle v-if="launch.launch_site">
								<strong>Launch Site:</strong>
								{{ launch.launch_site.site_name }}
							</v-card-subtitle>
							<v-card-subtitle v-if="launch.rocket">
								<strong>Rocket:</strong>
								{{ launch.rocket.rocket_name }}
							</v-card-subtitle>
							<v-card-subtitle v-if="launch.details">
								<strong>Details:</strong>
								{{ launch.details }}
							</v-card-subtitle>
						</v-card>
					</v-col>
				</v-row>
			</v-container>
		</v-app>
	</div>
</template>

<script setup lang="ts">
import { useLaunchFilter } from '~/composables/useLaunchFilter'
import { useSort } from '~/composables/useSort'

const query = gql`
	query Launches {
		launches {
			id
			details
			mission_name
			launch_date_utc
			rocket {
				rocket_name
				rocket_type
			}
			launch_site {
				site_name
			}
		}
	}
`

const { data } = useAsyncQuery<{
	launches: {
		id: string
		mission_name: string
		launch_date_utc: Date
		launch_site: {
			site_name: string
		}
		rocket: {
			rocket_name: string
			rocket_type: string
		}
		details?: string
	}[]
}>(query)

const { selectedYear, filteredLaunches, availableYears } = useLaunchFilter(data.value?.launches || [])
const { sortDesc, sortedData, sortBy } = useSort(filteredLaunches)

const filterLaunches = () => {}
const sortDirection = computed(() => (sortDesc.value ? 'desc' : 'asc'))

const clearFilter = () => {
	selectedYear.value = null
	filterLaunches()
}
</script>

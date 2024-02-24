<template>
	<div class="spacing" :class="$style.info">
		<div :class="$style.stats">
			<ul class="nolist">
				<li v-if="item.budget">
					<div :class="$style.label">
						<div>
							<svg width="80px" height="80px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M6 8H4M6 16H4M6 12H3M7 4.51555C8.4301 3.55827 10.1499 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C10.1499 21 8.4301 20.4417 7 19.4845M14 9.49991C13.5 9.37589 12.6851 9.37133 12 9.37589M12 9.37589C11.7709 9.37742 11.9094 9.36768 11.6 9.37589C10.7926 9.40108 10.0016 9.73666 10 10.6874C9.99825 11.7002 11 11.9999 12 11.9999C13 11.9999 14 12.2311 14 13.3124C14 14.125 13.1925 14.4811 12.1861 14.599C12.1216 14.599 12.0597 14.5991 12 14.5994M12 9.37589L12 8M12 14.5994C11.3198 14.6022 10.9193 14.6148 10 14.4999M12 14.5994L12 16" stroke="#fff5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
							</svg>
						</div>
						<div>Budget</div>
					</div>

					<div :class="$style.value" style="font-size: x-large">$ {{ item.budget.toLocaleString() }}</div>
				</li>
				<li v-if="item.revenue">
					<div :class="$style.label">
						<div>
							<svg width="80px" height="80px" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
								<g id="Layer_2" data-name="Layer 2">
									<g id="invisible_box" data-name="invisible box">
										<rect width="48" height="48" fill="none"/>
									</g>
									<g id="Q3_icons" data-name="Q3 icons">
										<path d="M44,7.1V14a2,2,0,0,1-2,2H35a2,2,0,0,1-2-2.3A2.1,2.1,0,0,1,35.1,12h2.3A18,18,0,0,0,6.1,22.2a2,2,0,0,1-2,1.8h0a2,2,0,0,1-2-2.2A22,22,0,0,1,40,8.9V7a2,2,0,0,1,2.3-2A2.1,2.1,0,0,1,44,7.1Z" stroke="#fff5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
										<path d="M4,40.9V34a2,2,0,0,1,2-2h7a2,2,0,0,1,2,2.3A2.1,2.1,0,0,1,12.9,36H10.6A18,18,0,0,0,41.9,25.8a2,2,0,0,1,2-1.8h0a2,2,0,0,1,2,2.2A22,22,0,0,1,8,39.1V41a2,2,0,0,1-2.3,2A2.1,2.1,0,0,1,4,40.9Z" stroke="#fff5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
										<path d="M24.7,22c-3.5-.7-3.5-1.3-3.5-1.8s.2-.6.5-.9a3.4,3.4,0,0,1,1.8-.4,6.3,6.3,0,0,1,3.3.9,1.8,1.8,0,0,0,2.7-.5,1.9,1.9,0,0,0-.4-2.8A9.1,9.1,0,0,0,26,15.3V13a2,2,0,0,0-4,0v2.2c-3,.5-5,2.5-5,5.2s3.3,4.9,6.5,5.5,3.3,1.3,3.3,1.8-1.1,1.4-2.5,1.4h0a6.7,6.7,0,0,1-4.1-1.3,2,2,0,0,0-2.8.6,1.8,1.8,0,0,0,.3,2.6A10.9,10.9,0,0,0,22,32.8V35a2,2,0,0,0,4,0V32.8a6.3,6.3,0,0,0,3-1.3,4.9,4.9,0,0,0,2-4h0C31,23.8,27.6,22.6,24.7,22Z" stroke="#fff5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
									</g>
								</g>
							</svg>
						</div>
						<div>Revenue</div>
					</div>

					<div :class="$style.value" style="font-size: x-large">$ {{ item.revenue.toLocaleString() }}</div>
				</li>
				<li v-if="item.genres && item.genres.length">
					<div :class="$style.label">
						<div>
							<svg fill="#fff5" width="80px" height="80px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M10 3H4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1zm10 10h-6a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-6a1 1 0 0 0-1-1zM17 3c-2.206 0-4 1.794-4 4s1.794 4 4 4 4-1.794 4-4-1.794-4-4-4zM7 13c-2.206 0-4 1.794-4 4s1.794 4 4 4 4-1.794 4-4-1.794-4-4-4z"/></svg>
						</div>
						<div>Genre</div>
					</div>

					<div :class="$style.value" v-html="formatGenres(item.genres)" />
				</li>
				<li
					v-if="item.production_companies && item.production_companies.length"
				>
					<div :class="$style.label">
						<div>
							<svg width="80px" height="80px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M21.15 6.17C20.74 5.95 19.88 5.72 18.71 6.54L17.24 7.58C17.13 4.47 15.78 3.25 12.5 3.25H6.5C3.08 3.25 1.75 4.58 1.75 8V16C1.75 18.3 3 20.75 6.5 20.75H12.5C15.78 20.75 17.13 19.53 17.24 16.42L18.71 17.46C19.33 17.9 19.87 18.04 20.3 18.04C20.67 18.04 20.96 17.93 21.15 17.83C21.56 17.62 22.25 17.05 22.25 15.62V8.38C22.25 6.95 21.56 6.38 21.15 6.17ZM11 11.38C9.97 11.38 9.12 10.54 9.12 9.5C9.12 8.46 9.97 7.62 11 7.62C12.03 7.62 12.88 8.46 12.88 9.5C12.88 10.54 12.03 11.38 11 11.38Z" fill="#fff5"/>
							</svg>
						</div>
						<div>Production</div>
					</div>

					<div
						:class="$style.value"
						v-html="formatProductionCompanies(item.production_companies)"
					/>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import { apiImgUrl } from "~/store/backend";
import { name, directors, runtime } from "~/mixins/Details";

export default {
	mixins: [name, directors, runtime],

	props: {
		item: {
			type: Object,
			required: true,
		},
	},

	computed: {
		poster() {
			if (this.item.poster_path) {
				return `${apiImgUrl}/w370_and_h556_bestv2${this.item.poster_path}`;
			} else {
				return false;
			}
		},
	},

	methods: {
		formatGenres(genres) {
			return genres.map((genre) => genre.name).join(", ");
		},

		formatProductionCompanies(production_companies) {
			return production_companies
				.map((production_company) => production_company.name)
				.join(", ");
		},
	},
};
</script>

<style lang="scss" module>
@import "~/assets/css/utilities/_variables.scss";

.stats {
	margin-bottom: 3rem;
	font-size: 1.5rem;
	color: $text-color;

	@media (min-width: $breakpoint-large) {
		font-size: 1.6rem;
	}

	ul {
		@media (min-width: $breakpoint-medium) {
			display: flex;
			flex-wrap: wrap;
		}
	}

	li {
		display: flex;
		align-items: center;
		flex: 1; /* Equal width for all items */
		padding: 0.2rem 0;

		@media (min-width: $breakpoint-medium) {
			width: calc(33.33% - 1rem); /* Adjust as needed */
			margin-right: 1rem; /* Space between items */
		}

		@media (min-width: $breakpoint-xlarge) {
			width: 100%;
			margin-right: 0;
		}
	}

	a {
		color: $primary-color;
		text-decoration: underline;
	}
}

.label {
	flex: 1;
	max-width: 90px;
	margin-right: 1.5rem;
	color: #fff;

	@media (min-width: $breakpoint-xsmall) {
		max-width: 110px;
	}
}

.value {
	flex: 2;
}

.external {
	ul {
		display: flex;
		margin-left: -0.5rem;
	}

	a {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 4.4rem;
		height: 4.4rem;

		svg {
			transition: all 0.3s ease-in-out;
		}

		&:hover,
		&:focus {
			svg {
				fill: $primary-color;
			}
		}
	}
}
</style>

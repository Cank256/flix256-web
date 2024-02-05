<template>
	<div class="listing listing--carousel">
		<div v-if="title || viewAllUrl" class="listing__head">
			<h2 v-if="title" class="listing__title">
				{{ title }}
			</h2>

			<nuxt-link v-if="viewAllUrl" :to="viewAllUrl" class="listing__explore">
				<strong>Explore All</strong>
			</nuxt-link>
		</div>

		<div class="carousel">
			<button
				class="carousel__nav carousel__nav--left"
				aria-label="Previous"
				type="button"
				:disabled="disableLeftButton"
				@click="moveToClickEvent('left')"
			>
				<!-- eslint-disable-next-line -->
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
				>
					<path
						fill="none"
						stroke="#fff"
						stroke-width="1.5"
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-miterlimit="10"
						d="M17.9 23.2L6.1 12 17.9.8"
					/>
				</svg>
			</button>

			<div ref="carouselElement" class="carousel__items" @scroll="scrollEvent">
				<Card
					v-for="item in items"
					:key="`card-${item.id}`"
					:item="item"
				/>

				<div v-if="viewAllUrl" class="card">
					<nuxt-link :to="viewAllUrl" class="card__link">
						<div class="card__img">
							<span>Explore All</span>
						</div>
					</nuxt-link>
				</div>
			</div>

			<button
				class="carousel__nav carousel__nav--right"
				aria-label="Next"
				type="button"
				:disabled="disableRightButton"
				@click="moveToClickEvent('right')"
			>
				<!-- eslint-disable-next-line -->
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
				>
					<path
						fill="none"
						stroke="#fff"
						stroke-width="1.5"
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-miterlimit="10"
						d="M6.1 23.2L17.9 12 6.1.8"
					/>
				</svg>
			</button>
		</div>
	</div>
</template>

<script>
import Carousel from "~/mixins/Carousel";
import Card from "~/components/Card";

export default {
	components: {
		Card,
	},

	mixins: [
        Carousel
    ],

    data() {
        return {
            disableLeftButton: true,
            disableRightButton: false,
        };
    },

	props: {
		title: {
			type: String,
			required: false,
			default: "",
		},

		viewAllUrl: {
			type: Object,
			required: false,
			default: function () {
				return null;
			},
		},

		items: {
			type: Object,
			required: true,
		},
	},

	mounted() {
		const count = this.viewAllUrl
			? this.items.length + 1
			: this.items.length;
		this.calculateState(count);
	},

	methods: {
        calculateState(numberOfItems) {
            let unusableVisibleWidth = 72;
            const firstChild = this.$refs.carouselElement.querySelector(":first-child");
            const elementWidth = firstChild ? firstChild.getBoundingClientRect().width : 0;
            const carouselWidth = numberOfItems * elementWidth;
            const maximumPosition = this.$refs.carouselElement.scrollWidth;

            if (window.innerWidth >= 1200) {
            unusableVisibleWidth = 92;
            }

            const visibleWidth = this.$refs.carouselElement.offsetWidth - unusableVisibleWidth;

            this.unusableVisibleWidth = unusableVisibleWidth;
            this.elementWidth = elementWidth;
            this.carouselWidth = carouselWidth;
            this.visibleWidth = visibleWidth;
            this.maximumPosition = maximumPosition;
            this.disableLeftButton = !this.$refs.carouselElement.scrollLeft;
            this.disableRightButton = visibleWidth >= carouselWidth;
        },
		resizeEvent() {
			const count = this.viewAllUrl
				? this.items.length + 1
				: this.items.length;

			this.calculateState(count);
		},
	},
};
</script>

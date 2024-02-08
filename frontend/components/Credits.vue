<template>
	<div v-if="people && people.length" class="listing listing--carousel">
		<div class="listing__head">
			<h2 class="listing__title">Cast</h2>
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
				<CreditsItem
					v-for="person in people"
					:key="`credit-${person.id}`"
					:person="person"
				/>
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
import smoothscroll from "smoothscroll-polyfill";
import { debounce } from "~/mixins/Functions";
import CreditsItem from "~/components/CreditsItem";

export default {
	components: {
		CreditsItem,
	},

	data() {
		return {
			elementWidth: 0,
			carouselWidth: 0,
			visibleWidth: 0,
			maximumPosition: 0,
			unusableVisibleWidth: 0,
			disableLeftButton: true,
			disableRightButton: false,
		};
	},

	props: {
		people: {
			type: Array,
			required: true,
		},
	},

	mounted() {
		smoothscroll.polyfill();
		window.addEventListener("resize", this.resizeEvent);
		this.calculateState(this.people.length);
	},

	beforeDestroy() {
		window.removeEventListener("resize", this.resizeEvent);
	},

	constructor() {
		this.$refs = {
			carouselElement: document.createElement("div"),
		};
	},

	methods: {
		calculateState(numberOfItems) {
			if (!(this.$refs.carouselElement instanceof HTMLElement)) {
				return;
			}
			let unusableVisibleWidth = 72;
			const firstChild =
				this.$refs.carouselElement.querySelector(":first-child");
			const elementWidth = firstChild
				? firstChild.getBoundingClientRect().width
				: 0;
			const carouselWidth = numberOfItems * elementWidth;
			const maximumPosition = this.$refs.carouselElement.scrollWidth;

			if (window.innerWidth >= 1200) {
				unusableVisibleWidth = 92;
			}

			const visibleWidth =
				this.$refs.carouselElement.offsetWidth - unusableVisibleWidth;

			this.unusableVisibleWidth = unusableVisibleWidth;
			this.elementWidth = elementWidth;
			this.carouselWidth = carouselWidth;
			this.visibleWidth = visibleWidth;
			this.maximumPosition = maximumPosition;
			this.disableLeftButton = !this.$refs.carouselElement.scrollLeft;
			this.disableRightButton = visibleWidth >= carouselWidth;
		},

		moveTo(width) {
			this.$refs.carouselElement.scrollTo({
				left: width,
				behavior: "smooth",
			});
		},

		moveToClickEvent(direction = "left" | "right") {
			const invisible =
				this.$refs.carouselElement.scrollLeft +
				(direction === "left" ? -this.visibleWidth + 1 : this.visibleWidth);
			const remainder = invisible - (invisible % this.elementWidth);

			this.moveTo(remainder);
		},

		scrollEvent() {
			const scrollLeft = this.$refs.carouselElement.scrollLeft;
			const end = this.maximumPosition - this.visibleWidth - this.elementWidth;

			this.disableLeftButton = scrollLeft < 3;
			this.disableRightButton = scrollLeft > end;
		},
		resizeEvent: debounce(function () {
			this.calculateState(this.people.length);
		}, 100),
	},
};
</script>

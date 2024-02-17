<template>
	<div class="card">
		<nuxt-link
			class="card__link"
			:to="{ name: `${media}-id`, params: { id: item.id } }"
		>
			<div class="card__img">
				<NuxtImg v-if="poster" :src="poster" loading="lazy" :alt="name" />

				<span v-else>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="40"
						height="40"
						viewBox="0 0 24 24"
						fill-rule="evenodd"
						clip-rule="evenodd"
						fill="#999"
					>
						<path
							d="M24 22h-24v-20h24v20zm-1-19h-22v18h22v-18zm-1 16h-19l4-7.492 3 3.048 5.013-7.556 6.987 12zm-11.848-2.865l-2.91-2.956-2.574 4.821h15.593l-5.303-9.108-4.806 7.243zm-4.652-11.135c1.38 0 2.5 1.12 2.5 2.5s-1.12 2.5-2.5 2.5-2.5-1.12-2.5-2.5 1.12-2.5 2.5-2.5zm0 1c.828 0 1.5.672 1.5 1.5s-.672 1.5-1.5 1.5-1.5-.672-1.5-1.5.672-1.5 1.5-1.5z"
						/>
					</svg>
				</span>
			</div>

			<h2 class="card__name">
				{{ name }}
			</h2>

			<div
				v-if="media !== 'person' && (stars || item.vote_average)"
				class="card__rating"
			>
				<div v-if="stars" class="card__stars">
					<div :style="{ width: `${stars}%` }" />
				</div>

				<div v-if="item.vote_average" class="card__vote">
					{{ rating.toFixed(1) }}
				</div>
			</div>
		</nuxt-link>

		<div class="save-container">
			<img
				v-if="isSaved || isFavorite"
				@click="deleteItem"
				src="@/assets/img/svg/heart_2.svg"
				class="heart-icon"
				alt="Saved"
			/>
			<img
				v-else
				@click="saveItem"
				src="@/assets/img/svg/heart_1.svg"
				class="heart-icon"
				alt="Not Saved"
			/>
		</div>
	</div>
</template>

<script>
import { apiImgUrl } from "~/store/backend";
import { name, stars, rating } from "~/mixins/Details";
import { useBackendStore } from "~/store/backend";

export default {
	mixins: [name, stars, rating],

	props: {
		item: {
			type: Object,
			required: true,
		},
	},

	data() {
		return {
			isSaved: false,
			isFavorite: false,
		};
	},

	mounted() {
		this.isFavorite = this.checkFavorites(this.item.id);
	},

	computed: {
		poster() {
			if (this.item.poster_path) {
				return `${apiImgUrl}/w370_and_h556_bestv2${this.item.poster_path}`;
			} else if (this.item.profile_path) {
				return `${apiImgUrl}/w370_and_h556_bestv2${this.item.profile_path}`;
			} else {
				return false;
			}
		},

		media() {
			if (this.item.media_type) {
				return this.item.media_type;
			} else if (this.item.name) {
				return "tv";
			} else {
				return "movie";
			}
		},
	},

	methods: {
		getUserId() {
			if (localStorage.getItem("user") !== null) {
				const userData = JSON.parse(localStorage.getItem("user"));
				return userData.user?._id;
			}
		},

		async saveItem() {
			const favoriteData = {
				user_id: this.getUserId(),
				id: this.item.id,
				media_type: this.media,
				title: this.item.title ? this.item.title : this.item.name,
				poster_path: this.item.poster_path,
			};
			try {
				const response = await useBackendStore().addFavorite(favoriteData);
				this.item._id = response.data.favorite_id;
				this.isSaved = true;
			} catch (error) {
				console.error("There was an error in saving favorite", error);
			}
		},

		async deleteItem() {
			try {
				await useBackendStore().deleteFavorite(this.item._id, this.getUserId());
				this.isSaved = false;
			} catch (error) {
				console.error("There was an error in deleting favorite", error);
			}
		},

		checkFavorites(item_id) {
			// Get favorites from localStorage
			const userFavorites =
				JSON.parse(window.localStorage.getItem("favorites")) || [];

			// Iterate over items.results and check if each item is found in favorites
			if (userFavorites) {
				const result = userFavorites.some(
					(favorite) => {
						const check = favorite.id === item_id;
						if (check) {
							this.item._id = favorite._id;
						}
						return check;
					}
				);
				return result;
			} else {
				return false;
			}
		}
	},
};
</script>

<style>
.save-container {
	position: relative;
	top: -110px;
	right: -180px;
	width: 60px;
	height: 60px;
}

.card__img {
	position: relative;
	overflow: hidden;
	border-radius: 10px;
}

.card__img img {
	border-radius: 10px;
	width: 100%;
	height: 100%;
	object-fit: cover;
}

.card__img svg {
	width: 100%;
	height: 100%;
	object-fit: cover;
}

.card__img .heart-icon {
	position: absolute;
	bottom: 5px;
	right: 5px;
	width: 60px;
	height: 60px;
	transform: translate(190px, 300px);
}
</style>

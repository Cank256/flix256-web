<template>
	<footer :class="$style.footer">
		<p>&copy; {{ new Date().getFullYear() }} Cank256. All rights reserved.</p>
		<p>
			Built by
			<a target="_blank" href="https://www.github.com/Cank256">Cank256</a>, data
			provided by
			<a target="_blank" href="https://www.themoviedb.org/" rel="noopener"
				>TMDb</a
			>.
		</p>

		<ul class="nolist">
			<li>
				<a
					href="https://www.linkedin.com/in/nkunzecaleb/"
					target="_blank"
					aria-label="Link to LinkedIn account"
					rel="noopener"
				>
					<!-- eslint-disable-next-line -->
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="20"
						height="20"
						viewBox="0 0 24 24"
						fill="#585858"
					>
						<path
							d="M19 0H5a5 5 0 0 0-5 5v14a5 5 0 0 0 5 5h14a5 5 0 0 0 5-5V5a5 5 0 0 0-5-5zM8 19H5V8h3v11zM6.5 6.732c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zM20 19h-3v-5.604c0-3.368-4-3.113-4 0V19h-3V8h3v1.765c1.396-2.586 7-2.777 7 2.476V19z"
						/>
					</svg>
				</a>
			</li>
			<li>
				<a
					href="mailto:nkunzecaleb@gmail.com"
					aria-label="Link to Email"
					rel="noopener"
				>
					<!-- eslint-disable-next-line -->
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="20"
						height="20"
						viewBox="0 0 24 24"
						fill="#585858"
					>
						<path
							d="M0 3v18h24V3H0zm21.518 2L12 12.713 2.482 5h19.036zM2 19V7.183l10 8.104 10-8.104V19H2z"
						/>
					</svg>
				</a>
			</li>
			<li>
				<a
					href="https://www.twitter.com/Cank256"
					aria-label="Link to Twitter"
					rel="noopener"
				>
					<!-- eslint-disable-next-line -->
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="25"
						height="25"
						viewBox="0 0 48 48"
						id="Layer_2"
						data-name="Layer 2"
						fill="#585858"
					>
						<path
							class="cls-1"
							d="M38.74,16.55v1c0,10.07-7.64,21.61-21.62,21.61A21.14,21.14,0,0,1,5.5,35.71a12.22,12.22,0,0,0,1.81.11,15.25,15.25,0,0,0,9.44-3.24,7.56,7.56,0,0,1-7.1-5.29,6.9,6.9,0,0,0,1.44.15,7.53,7.53,0,0,0,2-.27A7.57,7.57,0,0,1,7,19.72v-.1a7.42,7.42,0,0,0,3.44.94A7.54,7.54,0,0,1,8.05,10.5a21.58,21.58,0,0,0,15.68,7.94,6.38,6.38,0,0,1-.21-1.74,7.55,7.55,0,0,1,13.17-5.31,15.59,15.59,0,0,0,4.83-1.85,7.65,7.65,0,0,1-3.39,4.27,15.87,15.87,0,0,0,4.37-1.26,15.56,15.56,0,0,1-3.76,4Z"
						/>
					</svg>
				</a>
			</li>
			<li>
				<a
					href="https://www.github.com/Cank256"
					aria-label="Link to Github"
					rel="noopener"
				>
					<!-- eslint-disable-next-line -->
					<!-- <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#585858"><path d="M0 3v18h24V3H0zm21.518 2L12 12.713 2.482 5h19.036zM2 19V7.183l10 8.104 10-8.104V19H2z"/></svg> -->
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="25"
						height="25"
						viewBox="0 0 48 48"
						id="Layer_2"
						data-name="Layer 2"
						fill="#585858"
					>
						<path
							class="cls-1"
							d="M24,2.5a21.5,21.5,0,0,0-6.8,41.9c1.08.2,1.47-.46,1.47-1s0-1.86,0-3.65c-6,1.3-7.24-2.88-7.24-2.88A5.7,5.7,0,0,0,9,33.68c-1.95-1.33.15-1.31.15-1.31a4.52,4.52,0,0,1,3.29,2.22c1.92,3.29,5,2.34,6.26,1.79a4.61,4.61,0,0,1,1.37-2.88c-4.78-.54-9.8-2.38-9.8-10.62a8.29,8.29,0,0,1,2.22-5.77,7.68,7.68,0,0,1,.21-5.69s1.8-.58,5.91,2.2a20.46,20.46,0,0,1,10.76,0c4.11-2.78,5.91-2.2,5.91-2.2a7.74,7.74,0,0,1,.21,5.69,8.28,8.28,0,0,1,2.21,5.77c0,8.26-5,10.07-9.81,10.61a5.12,5.12,0,0,1,1.46,4c0,2.87,0,5.19,0,5.9s.39,1.24,1.48,1A21.5,21.5,0,0,0,24,2.5"
						/>
					</svg>
				</a>
			</li>
		</ul>
	</footer>
</template>

<style lang="scss" module>
@import "~/assets/css/utilities/_variables.scss";

.footer {
	position: relative;
	bottom: 0;
	left: 0;
	right: 0;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	padding: 2rem 1.5rem 6.5rem;
	color: $text-color-grey;

	@media (min-width: $breakpoint-small) {
		padding-right: 4rem;
		padding-left: 4rem;
	}

	@media (min-width: $breakpoint-large) {
		padding: 2rem 5rem;
	}

	p {
		margin: 0.3rem 0;
		font-size: 1.4rem;
	}

	a {
		color: $text-color-grey;
		text-decoration: underline;
	}

	ul {
		display: flex;
		justify-content: center;
		align-items: center;
		margin: 2rem 0 0 -0.5rem;

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
					fill: #fff;
				}
			}
		}
	}
}
</style>

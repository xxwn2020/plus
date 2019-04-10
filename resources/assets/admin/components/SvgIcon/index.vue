<template>
	<svg :class="svgClass" aria-hidden="true" v-on="$listeners">
		<use :xlink:href="iconName"></use>
	</svg>
</template>

<script>
export default {
	name: "SvgIcon",
	props: {
		iconClass: {
			type: String,
			required: true
		},
		className: {
			type: String,
			default: ""
		},
		size: {
			type: String,
			default: ""
		}
	},
	computed: {
		iconName() {
			return `#icon-${this.iconClass}`;
		},
		svgClass() {
			if (this.className) {
				return "svg-icon " + this.className + " " + this.size;
			} else {
				return "svg-icon" + " " + this.size;
			}
		}
	}
};
</script>

<style scoped lang="less">
.svg-icon {
	width: 1em;
	height: 1em;
	vertical-align: -0.15em;
	fill: currentColor;
	overflow: hidden;
}
.icon {
	width: 1.5em;
	height: 1.5em;
	vertical-align: -0.4em;
	fill: currentColor;
	overflow: hidden;

	&.lg {
		width: 2em;
		height: 2em;
		vertical-align: -0.3em;
	}

	&.xl {
		width: 3em;
		height: 3em;
		vertical-align: -0.45em;
	}

	&.sm {
		width: 1.25em;
		height: 1.25em;
		vertical-align: -0.275em;
	}

	&.xs {
		width: 0.75em;
		height: 0.75em;
		vertical-align: -0.2em;
	}
}
</style>

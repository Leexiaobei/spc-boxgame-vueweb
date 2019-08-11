<template>
	<div>
	
	</div>
</template>
<script>
	export default {
		name: 'login',
		data () {
			return {
				 
			}
		},
		mounted() {

		},
        beforeMount() {
			var reModel = JSON.parse(localStorage.getItem('reModel'));
			console.log(reModel);
        },
		methods: {

		}
	}
</script>


<style lang="scss">

</style>

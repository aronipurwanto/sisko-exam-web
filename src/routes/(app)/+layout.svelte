<script>
    import Menu from "$lib/components/Menu.svelte";
    import Navbar from "$lib/components/Navbar.svelte";
    import Transition from "$lib/components/Transition.svelte";
    import {page} from "$app/state";
	let { children } = $props();
</script>
<Navbar />
<Menu/>
<main class="app-content">
    <Transition key={page.url.pathname} duration={400}>
        {@render children()}
    </Transition>
</main>

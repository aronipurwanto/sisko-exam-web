<script>
    const currentYear = new Date().getFullYear();

    const footerLinks = [
        { href: "https://themeforest.net/licenses/standard", text: "License" },
        { href: "https://1.envato.market/pixinvent_portfolio", text: "More Themes" },
        { href: "https://demos.pixinvent.com/vuexy-html-admin-template/documentation/", text: "Documentation" },
        { href: "https://pixinvent.ticksy.com/", text: "Support", hideOnMobile: true }
    ];
</script>

<footer class="footer bg-body-tertiary border-top py-3 mt-5">
    <div class="container-xxl">
        <div class="d-flex flex-column flex-md-row justify-content-between align-items-center">
            <!-- Copyright -->
            <div class="order-2 order-md-1 text-center text-md-start mt-3 mt-md-0">
                <small class="text-muted">
                    © {currentYear}, made with
                    <i class="bi bi-heart-fill text-danger mx-1"></i>
                    by
                    <a href="https://pixinvent.com"
                       target="_blank"
                       class="text-decoration-none fw-semibold text-primary-emphasis">
                        Pixinvent
                    </a>
                </small>
            </div>

            <!-- Links -->
            <div class="order-1 order-md-2">
                <div class="d-flex flex-wrap justify-content-center gap-3">
                    {#each footerLinks as link}
                        {#if !link.hideOnMobile}
                            <a href={link.href}
                               target="_blank"
                               class="text-muted text-decoration-none small footer-link">
                                {link.text}
                            </a>
                        {:else}
                            <a href={link.href}
                               target="_blank"
                               class="text-muted text-decoration-none small footer-link d-none d-sm-inline-block">
                                {link.text}
                            </a>
                        {/if}
                    {/each}
                </div>
            </div>
        </div>
    </div>
</footer>

<style>
    .footer-link {
        transition: color 0.15s ease-in-out;
        position: relative;
    }

    .footer-link:hover {
        color: var(--bs-primary) !important;
    }

    .footer-link:not(:last-child):after {
        content: "•";
        margin-left: 0.75rem;
        color: var(--bs-secondary);
    }
</style>
<script lang="ts">

export default {};
</script>

<template>
    <div class="footer-wrap">
        <div class="left-wrap">
            <p class="find-me-text">find me in:</p>
            <div class="social-icon-wrap">
                <a class="social_item" href="mailto:joshyjoy.dev@gmail.com">
                    <i class="bi bi-envelope-fill"></i>
                    <p>joshyjoy.dev@gmail.com</p>
                </a>
                <a class="social_item" href="tel:+917907692651">
                    <i class="bi bi-telephone-fill"></i>
                    <p>+91-7907692651</p>
                </a>
            </div>
        </div>
        <div class="right-wrap">
            <p>UTF-8</p>
            <a class="footer_github" href="">
                <i class="bi bi-github"></i>
                <p>@joshy-joy</p>
            </a>
            <div class="notifications">
                <i class="bi bi-bell-fill"></i>
            </div>
        </div>
    </div>
</template>

<style scoped>
.footer-wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    width: 100%;
    color: #ffff;
    font-family: "Roboto", sans-serif;
}

.left-wrap, .right-wrap {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    height: 100%;
}

.find-me-text {
    margin: 0 10px;
    padding: 3px 10px;
    border-right: 1px solid #ffff;
    font-size: 12px;
}

.social-icon-wrap {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin: 0 5px;
}

.social_item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-decoration: none;
    color: #ffff;
}

.social_item p {
    margin: 0;
    padding: 0 20px;
    font-size: 12px;
}

.right-wrap p {
    margin: 0;
    font-size: 12px;
    padding: 0 10px;
}

.footer_github {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    text-decoration: none;
    color: #ffff;
    padding: 0 10px;
}

.notifications{
    padding: 0 5px;
}

@media all and (max-width: 633px) {
    .social_item p, .footer_github p {
        display: none;
    }

    .social_item i {
        margin: 0 10px;
    }
}
</style>
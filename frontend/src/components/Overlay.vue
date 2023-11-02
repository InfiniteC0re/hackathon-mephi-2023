<template>
    <div id="overlay" v-if="overlayVisible">
        <div class="overlay-form">
            <h2>{{ overlayCaption }}</h2>
            <div class="field" v-for="field in overlayFields">
                <div class="field-item input-wrap" v-if="field.type == 'input'">
                    <p>{{ field.hint }}:</p>
                    <input :placeholder="field.placeholder" v-model="field.value" type="text">
                </div>
                <div class="field-item selector-wrap" v-else-if="field.type == 'variants'">
                    <p>{{ field.hint }}:</p>
                    <div class="variants">
                        <button v-for="(variant, index) in field.variants" :class="{ 'active': field.value == index }"
                            @click="field.value = index">{{ variant }}</button>
                    </div>
                </div>
            </div>
            <div class="buttons">
                <button @click="() => closeOverlay(0)">ОК</button>
                <button @click="() => closeOverlay(1)">Отмена</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    computed: {
        overlayVisible() {
            return this.$store.state.overlay.visible;
        },
        overlayCaption() {
            return this.$store.state.overlay.caption;
        },
        overlayFields() {
            return this.$store.state.overlay.fields;
        },
        overlayCallback() {
            return this.$store.state.overlay.closeCallback;
        }
    },
    methods: {
        closeOverlay(result) {
            this.overlayCallback(result);
            this.$store.state.overlay.visible = false;
        }
    },
}
</script>

<style lang="scss" scoped>
#overlay {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: rgba(0, 0, 0, .4);
    backdrop-filter: blur(24px);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;

    @keyframes overlay-form-appear {
        0% {
            opacity: 0;
            transform: translateY(100%);
        }

        50% {
            opacity: 0.2;
        }

        100% {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .overlay-form {
        max-width: 400px;
        width: 70%;
        padding: 16px;
        border-radius: 8px;
        border: 1px solid rgba(255, 255, 255, .2);
        background: var(--background-color);
        display: flex;
        flex-direction: column;
        animation: overlay-form-appear 0.3s;

        h2 {
            margin-bottom: 8px;
        }

        .buttons {
            display: flex;
            flex-direction: column;
            gap: 8px;
            margin-top: 8px;
        }

        .field {
            p {
                line-height: 28px;
                text-align: left;
                font-weight: 400;
                margin-left: 4px;
                opacity: 0.8;
            }

            .field-item {
                margin-bottom: 8px;
            }

            .input-wrap {
                position: relative;
                display: flex;
                flex-direction: column;

                input {
                    font-weight: 400;
                    outline: none;
                    border: 0;
                    padding: 10px;
                    font-size: 1rem;
                    border-radius: 4px;
                    background: var(--button-color);
                    border: 1px solid rgba(255, 255, 255, .12);
                    transition: border-color 0.25s;
                    opacity: 1.0;

                    &:focus {
                        border-color: var(--button-active-color);
                    }
                }
            }

            .selector-wrap {
                .variants {
                    display: flex;
                    gap: 8px;
                    justify-content: space-between;

                    button {
                        flex: 1;
                        padding-left: 0;
                        padding-right: 0;
                    }
                }
            }
        }
    }
}
</style>
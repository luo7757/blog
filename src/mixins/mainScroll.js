export default (domValue) => {
    return {
        methods :{
            handleMainScroll() {
                this.$bus.$emit("mainScroll", this.$refs[domValue]);
            },
            handleSetMainScroll(scrollTop) {
                this.$refs[domValue].scrollTop = scrollTop;
            },
        },
        mounted() {
            this.$bus.$on("setMainScroll", this.handleSetMainScroll);
            this.$refs[domValue].addEventListener("scroll", this.handleMainScroll);
        },
        beforeDestroy() {
            this.$refs[domValue].removeEventListener("scroll", this.handleMainScroll);
            this.$bus.$emit("mainScroll");
            this.$bus.$off("setMainScroll", this.handleSetMainScroll);
        },
    }
}
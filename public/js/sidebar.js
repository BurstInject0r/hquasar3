const toggleProfileLinks = () => {
    if ($("#profileLinks").hasClass("collapsed")) {
        $("#profileLinks").slideDown(100);
        $("#profileLinks").removeClass("collapsed");
        $("#profileLinksArrow").removeClass("fa-angle-down");
        $("#profileLinksArrow").addClass("fa-angle-up");
    } else {
        $("#profileLinks").slideUp(100);
        $("#profileLinks").addClass("collapsed")
        $("#profileLinksArrow").removeClass("fa-angle-up");
        $("#profileLinksArrow").addClass("fa-angle-down");
    }
}
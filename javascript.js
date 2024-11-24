(function() {
    // Get references to the elements
    const div = document.querySelector('div');
    const p = document.querySelector('p');
    const a = document.querySelector('a');


    function onDivHover() {
        div.style.backgroundColor = 'lightcoral';
        div.style.color = 'white';
        div.style.border = '2px dashed red';
        div.style.fontWeight = 'bold';
    }


    function onParagraphClick() {
        p.style.backgroundColor = 'lightpink';
        p.style.fontSize = '30px';
        p.style.borderRadius = '10px';
        p.style.padding = '20px';
    }


    function onLinkClick(event) {

        event.preventDefault();
        a.style.backgroundColor = 'lightblue';
        a.style.color = 'darkblue';
        a.style.textDecoration = 'underline';
        a.style.fontStyle = 'italic';
    }


    div.addEventListener('mouseover', onDivHover);


    p.addEventListener('click', onParagraphClick);


    a.addEventListener('click', onLinkClick);

})();  
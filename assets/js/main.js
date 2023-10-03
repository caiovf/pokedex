var loading = false;
var stopInfiniteScroll = false;
const limit = 36
var offset = 0

const listPokemon = document.getElementById('list');

function pokemonHtml(pokemon){

    return `
        <article class="pokemon ${pokemon.type}" title="${pokemon.name}">
            <h3>${pokemon.name}</h3>
            <small>#${pokemon.order}</small>
            <div class="pokemon-info">
                <ul class="pokemon-type">
                    ${ pokemon.types.map((type) => `<li class="${type}">${type}</li>`).join('')}
                </ul>
                <div class="box-img">
                    <img class="img-responsive" src="${pokemon.photo}" width="125" height="125" alt="Imagem do pokemon ${pokemon.name}">
                </div>
            </div>
        </article>
    `
}

function loadPokemonItens(offset,limit) {

    api.getPokemons(offset,limit).then((apiResults = []) => {
        const newHtml = apiResults.map(pokemonHtml).join('');
        
        listPokemon.innerHTML += newHtml;
    });
};

loadPokemonItens(offset,limit);

window.addEventListener("scroll",function(){
    const containerOffsetTop = listPokemon.getBoundingClientRect().top + window.scrollY ;
    const containerHeight = listPokemon.clientHeight;
    const windowScrollTop = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    if (documentHeight - (windowHeight + windowScrollTop) < documentHeight - (containerHeight + containerOffsetTop)) {
        
        if( !loading && !stopInfiniteScroll ){
            loading = true;        
            offset += limit;
            
            const qtdNextPage = offset + limit;

            if(qtdNextPage >= 151){
                const newLimit = 151 - offset;

                api.getPokemons(offset,newLimit).then((apiResults = []) => {
                    const newHtml = apiResults.map(pokemonHtml).join('');
                    
                    listPokemon.innerHTML += newHtml;
                    loading = false;       
                    stopInfiniteScroll = true         
                });   
                
            } else {

                api.getPokemons(offset,limit).then((apiResults = []) => {
                    const newHtml = apiResults.map(pokemonHtml).join('');
                    
                    listPokemon.innerHTML += newHtml;
                    loading = false;                
                });            
            }

        }
    }

},{ passive: true});

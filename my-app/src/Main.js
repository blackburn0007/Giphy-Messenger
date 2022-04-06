const GIPHY_API = "https://api.giphy.com/v1/gifs/search?api_key=yKtUX7bMFtaAKgeNEy330Ux3nDKZprUN&limit=6&q="

let GifSearch = () => {
    let [search, setSearch] = React.useState("");
    let [gifs, setGifs] = React.useState([]);
    let [loading, setLoading] = React.useState(false);
    let searchGif = () => {
        if (search.length > 0) {
            setLoading(true)
            fetch(GIPHY_API + search)
                .then((res) => {
                    setLoading(false);
                    return res.json();
                })
                .then((result) => {
                    setGifs(result.data.map((gif) => {
                        return gif.images.fixed_height.url
                    }))
                })
                .catch(() => {
                    setLoading(false);
                    alert("Something went wrong")
                })
        }
    }
    return (
        <div>
            <div className="header">
                <input
                    type="text"
                    placeholder="/gif"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <button onClick={searchGif}>
                    Search
                </button>
            </div>
            <div className="result"></div>
            <div className="loading">
                <div class="loader"></div>
            </div>
            <div className="list">
                {
                    gifs.map((gif) => {
                        return (
                            <div className="item">
                                <img src={gif} />
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

ReactDOM.render(<GifSearch />, document.querySelector('#root'));
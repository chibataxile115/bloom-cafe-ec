- 配列が空じゃない時
- 配列の指定したindexが存在している時

[
    'https://github.com/',
    'https://github.com/',
    'https://github.com/'
]



/おにぎり
    status: false

まくのうち
    status: true

/のりべん
    status: false



```javascript
const menueList = ['のり弁', '幕の内', 'おにぎり']

menueList.map((item) => {
    dispatch(addMenue(item, false))
})


const menue = [
    {name: '幕の内', isInCart: true},
    {name: 'のり弁', isInCart: false},
    {name: 'おにぎり', isInCart: false},
]

```
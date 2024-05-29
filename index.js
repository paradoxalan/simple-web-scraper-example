const PORT = 8000
const axios = require('axios')
const cheerio = require('cheerio')
const express = require('express')

const app = express()
let url = 'https://www.folha.uol.com.br/'

app.set('view engine', 'pug')

let getNoticias = async() => {
	const response = await axios.get(url)
	let html = response.data
	let list = []
	const $ = cheerio.load(html)
	$("a.c-headline__url", html).each(function(){
		let title = $(this).find('h2').text()
		let link = $(this).attr('href')
		list.push({title:title, link: link})
	})
	return list
}

app.get('/', async (req, res) => {

	let noticias = await getNoticias()
	res.render('index', { noticias: noticias })
})

app.listen(PORT, () => console.log('server running!'))
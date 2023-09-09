<svelte:head>
	<meta name="theme-color" content="#008000" />
</svelte:head>

<script lang="ts">
	import { onMount } from 'svelte';
	import { draw, fade, fly, scale } from 'svelte/transition';
    import Modal from './Modal.svelte';
    import Progress from './Progress.svelte';
	import { getWordScore, getRank } from './scoring';

	type Game = {
		letters: string[],
		center: string,
		outer: string[],
		validWords: string[],
		pangrams: string[],
		maxScore: number,
		date: string,
	}
	type Feedback = {
		message: string | undefined
		positive: boolean | undefined
		timeout: any | undefined
		pushMessage: (message: string, isPositive: boolean) => void
	}

	let game: Game
	let newGame: Game
	let currentWord: string = ""
	let foundWords: string[] = []
	let score: number = 0
	let showFoundWordsModal: boolean = false
	let showGameOverModal: boolean = false
	let showHintsModal: boolean = false

	function arrayEqual(a: any[], b: any[]): boolean {
		return a.length === b.length && a.every((v, i) => v === b[i])
	}
	
	async function loadGame() {
		game = JSON.parse(localStorage.getItem("game"))
		foundWords = JSON.parse(localStorage.getItem("foundWords")) || []
		score = foundWords.reduce((acc, word) => acc + getWordScore(word, game), 0)

		let res = await fetch("/get_game")
		newGame = await res.json()
		console.log(newGame.date, game.date)

		if (!game) {
			console.log("No local game found, using new game")
			startNewGame(newGame)
		}
		else if (!arrayEqual(newGame.letters, game.letters)) {
			console.log("Local game is outdated, showing game over modal")
			showGameOverModal = true
		}
	}
	loadGame()
	
	function startNewGame(newGame: Game) {
		console.log("New game started")
		game = newGame
		currentWord = ""
		foundWords = []
		score = 0
		localStorage.setItem("game", JSON.stringify(game))
		localStorage.setItem("foundWords", JSON.stringify(foundWords))
	}
	
	$: if (game) game.outer = game.letters.filter(letter => letter != game.center)
	$: if (game) game.maxScore = game.validWords.reduce((acc, word) => acc + getWordScore(word, game), 0)

	const feedback: Feedback =  {
		message: undefined,
		positive: undefined,
		timeout: undefined,
		pushMessage(message: string, positive: boolean) {
			currentWord = ""
			if (feedback.timeout) clearTimeout(feedback.timeout)
			feedback.message = message
			feedback.positive = positive
			feedback.timeout = setTimeout(() => {
				feedback.message = undefined
				feedback.positive = undefined
			}, 1000)
		}
	}

	onMount(() => {
		console.log("App.svelte mounted");
	});

	function addLetter(letter: string) {
		feedback.message = undefined
		feedback.timeout = undefined
		currentWord += letter
	}
	function deleteLast() {
		currentWord = currentWord.slice(0, -1)
	}
	function shuffleLetters() {
		game.letters = game.letters.sort(() => Math.random() - 0.5)
	}
	function enterWord() {
		if (!currentWord) return 
		if (currentWord.length < 4) {
			feedback.pushMessage("Too short", false)
			return
		}
		if (!currentWord.includes(game.center)) {
			feedback.pushMessage("Must include center letter", false)
			return
		}
		if (foundWords.includes(currentWord)) {
			feedback.pushMessage("Already found", false)
			return
		}
		if (!(game.validWords.includes(currentWord))) {
			feedback.pushMessage("Not in wordlist", false)
			return
		}
		else {
			foundWords = [currentWord, ...foundWords]
			let wordScore = getWordScore(currentWord, game)
			score += wordScore

			localStorage.setItem("foundWords", JSON.stringify(foundWords))

			if (game.pangrams.includes(currentWord)) {
				feedback.pushMessage(`Pangram!! (+${wordScore})`, true)
			}
			else {
				feedback.pushMessage(`Nice! (+${wordScore})`, true)
			}
			currentWord = ""
		}
	}

	document.addEventListener('keydown', (e) => {
		if (e.key == "Backspace") {
			deleteLast()
		}
		else if (e.key == "Enter") {
			enterWord()
		}
		else {
			addLetter(e.key)
		}
	})

	function hintsAreUnlocked(): boolean {
		let rank = getRank(score, game)[0]
		return (["🦧Orangutang", "🧑🏿‍🌾Human", "🤖Robot"].includes(rank))
	}

</script>


<main>

	{#if game}

	<Modal bind:showModal={showFoundWordsModal}>
		<div class="found-words-container">
			<h1>{foundWords.length} words found</h1>
			<div class="found-words-list">
				{#each foundWords.sort() as word (word)}
					<span class:pangram={game.pangrams.includes(word)}
							class="found-word-item">
						<a target="_blank" href="https://svenska.se/tre/?sok={word}&pz=1">{word}</a>
					</span>
				{/each}
			</div>
		</div>
	</Modal>

	{#if showGameOverModal} 
	<Modal bind:showModal={showGameOverModal} on:closeModal={() => startNewGame(newGame)}>
		{@const score = foundWords.reduce((acc, word) => acc + getWordScore(word, game), 0)}
		<div class="found-words-container">
			<div class="endgame-msg">
				<h1>Time's up!</h1>
				<h2><span class="green">{foundWords.length}</span>/{game.validWords.length} words found
					({Math.round((foundWords.length || 0) / game.validWords.length * 100)}%)</h2>
				<h2>Final rank: {getRank(score, game)[0]}</h2>
			</div>
			<div class="found-words-list">
				{#each game.validWords.sort() as word (word)}
					<span class:pangram={game.pangrams.includes(word)} class="found-word-item">
						<i class="bi bi-check green" 
						   class:invisible={!foundWords.includes(word)}></i>
						<a target="_blank" href="https://svenska.se/tre/?sok={word}&pz=1">{word}</a>
					</span>
				{/each}
			</div>
		</div>
	</Modal>
	{/if}

	{#if showHintsModal}
	<Modal bind:showModal={showHintsModal}>
		{@const remainingWords = game.validWords.filter((w) => !foundWords.includes(w)).sort()}
		{@const showFullHints = ["🧑🏿‍🌾Human", "🤖Robot"].includes(getRank(score, game)[0])}
		<h1>{remainingWords.length} remaining words: </h1>
		<div class="hints-container">
			{#each remainingWords as word (word)}
				<div class="word-hint">
					{#each word as c, i (i)}
						<div class="word-hint-letter">
							{#if (i === 0 || (i === 1 && showFullHints))}
								{c.toUpperCase()}
							{/if}
						</div>
					{/each}
				</div>
			{/each}
		</div>
	</Modal>
	{/if}
	
	<div class="top-bar">

		<Progress 
			foundWords={foundWords}
			game={game}
			score={score}
		> 
		</Progress>

		<button class="hints-btn" on:pointerdown={() => {
			if (hintsAreUnlocked()) showHintsModal = true
			else feedback.pushMessage("Reach 🦧Orangutang to unlock hints", false)
		}}>
			<i class="bi {hintsAreUnlocked() ? 'bi-lightbulb-fill' : 'bi-lock-fill'}"></i> Hints
		</button>
	</div>

	<div class="hive-outer">

		<div class="found-preview">
			<div class="found-preview-words">
				{#each foundWords as word, idx (word)}
					<span class="found-word" in:fly={{x: -100, duration: 500}}>
						{word}
					</span>
				{/each}
			</div>
			{#if foundWords.length > 0}
			<button transition:fade
				    class="show-all-found-btn" on:pointerdown={() => (showFoundWordsModal = true)}>
				Show all
			</button>
			{/if}
		</div>

		<div class="hive-input">
			{#if feedback.message}
				<div class="feedback feedback-{feedback.positive ? 'positive' : 'negative'}"
					in:fade={{duration: 500}}>
					{#if feedback.positive}
						<i class="bi bi-check green" style="font-size: 2rem;"></i>
					{:else}
						<i class="bi bi-x" style="font-size: 2rem; color: red;"></i>
					{/if}
					{feedback.message}
				</div>
			{:else}
			<div class="hive-input-text">
				{#each currentWord as letter, idx (idx)}
					<span class={letter == game.center ? "input-center-letter" : ""} >{letter.toUpperCase()}</span>
				{/each}
			</div>
			{/if}
		</div>
		
		<div class="hive-inner">

			<svg class="hex hex-center" transition:scale={{duration: 500}}
				fill="currentColor" height="100px" width="100px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 184.75 184.75" xml:space="preserve" stroke="#e6e6e6" stroke-width="0.0018475100000000001" transform="rotate(0)">
				<path on:pointerdown={(e) => addLetter(game.center)} 
					  d="M0,92.375l46.188-80h92.378l46.185,80l-46.185,80H46.188L0,92.375z">
				</path>
				<text on:pointerdown={(e) => addLetter(game.center)}
					  x="50%" y="50%" dominant-baseline="central" font-size="80">{game.center.toUpperCase()}
				</text>
			</svg>

			{#each game.outer as letter, idx (letter)}
			    {#key false}
				<svg class="hex hex-outer hex{idx+1}" transition:scale={{duration: 500}}
					fill="currentColor" height="100px" width="100px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 184.75 184.75" xml:space="preserve" stroke="#e6e6e6" stroke-width="0.0018475100000000001" transform="rotate(0)">
					<path on:pointerdown={(e) => addLetter(letter)} 
						  d="M0,92.375l46.188-80h92.378l46.185,80l-46.185,80H46.188L0,92.375z">
					</path>
					{#key game.outer}
					<text on:pointerdown={(e) => addLetter(letter)} transition:fade 
						  x="50%" y="50%" dominant-baseline="central" font-size="80">{letter.toUpperCase()}
					</text>
					{/key}
				</svg>
				{/key}
			{/each}

		</div>

		<div class="hive-buttons">
			<button class="hive-button" on:pointerdown={deleteLast}> Delete </button>
			<button class="hive-button shuffle-btn" on:pointerdown={shuffleLetters} > 
				<i class="bi bi-arrow-repeat"></i>
			</button>
			<button class="hive-button" on:pointerdown={enterWord} > Enter </button>
		</div>
		
	</div>
	{/if}

</main>

<style lang="scss">
	main {
		height: 100vh;
		width: 100%;
		// overflow: hidden;
		margin-left: auto; margin-right: auto;
		display: flex;
		flex-direction: column;
		align-items: center;
		font-family: 'Roboto', sans-serif;
		background-color: #F6F6F6;
	}
	@media (min-width: 700px) {
		main {
			width: 70%;
		}
	}
	a {
		all: unset;
		cursor: pointer;
	}
	button {
		border: 1px solid #dcdcdc;
		border-radius: 2.5em;
		cursor: pointer;
	}
	h1 {
		margin-bottom: 10px;
	}
	h2 {
		font-size: 1.2em;
		margin: 5px;
		color: #4a4646;
	}

	.invisible {
		visibility: hidden;
	}
	.green {
		font-weight: bold;
		color: #008000;
	}
	.bi-check {
		font-size: 1.2em;
	}
	.found-words-container {
		margin-left: 40px;
	}
	.found-words-list {
		margin: 0 auto;
		margin-top: 30px;
		overflow: scroll;
		display: flex;
		flex-wrap: wrap;
		gap: 0 10px;
		&::-webkit-scrollbar {
   			display: none;
		}
		.found-word-item {
			border-bottom: 1px solid #dcdcdc;
			// padding: 5px 10px;
			margin: 5px 0;
			font-size: 1.05em;
			flex: 45% 0 0;
		}
		.pangram {
			background-color: rgb(227, 190, 43);
		}
	}

	.top-bar {
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		.hints-btn {
			padding: 5px 10px;
		}
		.bi-lightbulb-fill {
			color: rgb(227, 190, 43);
		}
		.bi-lock-fill {
			color: #7a7a7a;
		}
	}

	.hints-container {
		display: flex;
		flex-direction: column;
		align-items: start;
		padding: 10px;
		margin: 10px 10px;

		.word-hint {
			display: flex;
			margin: 5px 0;
			gap: 4px;	
		}
		.word-hint-letter {
			width: 20px;
			font-size: 1.5em;
			background-color: #dcdcdc;
			// border: 1px solid rgb(71, 70, 70);
			text-align: center;
		}
	}

	.hive-outer {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.found-preview {
		margin-top: 10px;
		width: calc(100% - 15px);
		height: 50px;
		display: flex;
		align-items: center;
		// justify-content: center;
		overflow: hidden;
		border-radius: 5px;
		border: 1px solid #dcdcdc;
		padding: 0 5px;

		.found-preview-words {
			height: 100%;
			flex-grow: 1;
			overflow: hidden;
			display: flex;
			align-items: center;
			.found-word {
				font-size: 1.3em;
				margin: 0 7px;
			}
		}

		.show-all-found-btn {
			flex: 0 0 fit-content;
			margin-left: 20px;
			padding: 5px 10px;
			border-radius: 2.5em;
			background-color: white;
			border: 1px solid #dcdcdc;
		}
	}

	
	.hive-input {
		height: 50px;
		width: 100%;
		margin-top: 50px;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 2em;
		overflow: scroll;
		&::-webkit-scrollbar {
			display: none;
		}
		.input-center-letter {
			color: #008000;
		}
		.hive-input-text {
			display: flex;
			align-items: center;
		}
		.hive-input-text::after {
			content: "";
			width: 3px;
			height: 30px;
			margin-left: 4px;
			background: green;
			display: inline-block;
			animation: cursor-blink 1.5s cubic-bezier(0.34, 1.56, 0.64, 1) infinite;
		}
		@keyframes cursor-blink {
			0% { opacity: 0; }
			50% { opacity: 1; }
			100% { opacity: 0; }
		}
	}

	@media (max-height: 675px) {
		.hive-input {
			margin-top: 0px !important;
		}
		.hive-inner {
			height: 300px !important;
		}
	}

	.feedback {
		background-color: rgb(30, 30, 31);
		font-size: 0.5em;
		color: white;
		border: none;
		border-radius: 10px;
		padding: 0 10px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.hive-inner {
		height: 350px;
		width: 500px;
		display: flex;
		justify-content: center;
		align-items: center;
		user-select: none;
	}
	@media (max-width: 500px) {
		.hive-inner {
			width: 100%;
		}
	}
	.hex {
		position: absolute;

		&.hex-center {
			color: #008000;
		}
		&.hex1 { translate: 0    -90.5%; }
		&.hex2 { translate: 79%  -45%;   }
		&.hex3 { translate: 79%   45%;   }
		&.hex4 { translate: 0     90.5%; }
		&.hex5 { translate: -79%  45%;   }
		&.hex6 { translate: -79% -45%;   }

		transition: all 0.5s cubic-bezier(0.230, 1.000, 0.320, 1.000);
		&:active {
			scale: 0.9;
			opacity: 0.9;
		}
	}

	.hive-buttons {
		width: 50%;
		height: 80px;
		display: flex;
		justify-content: space-around;
		align-items: center;

		.hive-button {
			width: fit-content;
			margin: 0 10px;
			padding: 15px 20px;
			border-radius: 2.5em;
			font-size: 1.3em;
			&:active {
				background-color: #e6e6e6;
			}
		}
		.shuffle-btn {
			padding: 15px;
			width: fit-content;
			border-radius: 50%;
		}
	}

	svg {
		color: #e6e6e6;
		text {
			text-anchor: middle;
			color: rgb(0, 0, 0);
		}
	}

	.endgame-msg {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

</style>
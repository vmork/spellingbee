<script lang="ts">
    export let foundWords: string[] = [];
    export let game: any
    export let score: number;

    import { getRank } from './scoring'

    $: foundPangrams = foundWords.filter((word: string) => game.pangrams.includes(word))
    $: [rankName, pointsUntilNextRank] = getRank(score, game)
</script>

<div class="container">
    <div class="top">
        {rankName} 
        {#if score == game.maxScore}
            <span class="green">🎉</span>
        {:else}
        <span style:font-size={"0.75em"} style:color="grey">
            ({pointsUntilNextRank} to next)
            <!-- {Array.from(getRank(score + pointsUntilNextRank, game.maxScore)[0])[0]}) -->
        </span>
        {/if}
    </div>
    <div class="bottom">
        <div><span class="green">{score}</span>/{game.maxScore} points</div>
        <div class="bar"></div>
        <div><span class="green">{foundWords.length || 0}</span>/{game.validWords.length} words</div>
        <!-- <span style="font-size: 0.8em; color: #928888">
            ({Math.round((foundWords.length || 0) / game.validWords.length * 100)}%)
        </span> -->
        <div class="bar"></div>
        <div><span class="green">{foundPangrams.length}</span>/{game.pangrams.length} pangrams</div>
    </div>
</div>

<style lang="scss">
    .green {
        color: green;
    }
    .container {
        height: 80px;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;	
        position: relative;	
        // margin-left: 10px;
        .top {
            font-size: 1.5em;
        }
        .bottom {
            display: flex;
            width: 100%;
            justify-content: center;
            gap: 1.5%;
            margin-top: 10px;
            font-size: 1.05em;
            .bar {
                background-color: #928888;
                height: 100%;
                width: 1px;
            }
        }
    }
</style>

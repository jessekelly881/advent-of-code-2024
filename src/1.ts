import { FileSystem, Path } from "@effect/platform";
import { NodeContext } from "@effect/platform-node";
import { Console, Effect } from "effect";

const program = Effect.gen(function* () {
	const fs = yield* FileSystem.FileSystem;
	const path = yield* Path.Path;
	const contents = (yield* fs.readFileString(
		path.join(process.cwd(), "./inputs/1.txt"),
	)).trim();

	const lines = contents.split("\n");
	const len = lines.length;

	const leftArr: number[] = [];
	const rightArr: number[] = [];
	for (const line of lines) {
		const nums = line.split(/\s+/).map(Number) as [number, number];
		leftArr.push(nums[0]);
		rightArr.push(nums[1]);
	}

	leftArr.sort();
	rightArr.sort();

	let totalDiff = 0;
	for (let i = 0; i < len; i++) {
		const left = leftArr[i];
		const right = rightArr[i];
		// yield* Console.log(left, right);
		totalDiff += Math.abs(left - right);
	}
	yield* Console.log(totalDiff);
});

program.pipe(
	Effect.provide(NodeContext.layer),
	Effect.tapErrorCause(Effect.logError),
	Effect.runFork,
);

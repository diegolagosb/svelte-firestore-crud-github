<script>
	import { db } from "./firebase";
	import toastr from "toastr";

	let task = {
		name: "",
		description: "",
	};
	let tasks = [];
	let editStatus = false;
	let currentId;

	const getCurrentDate = () => {
		var hoy = new Date();
		var fecha =
			hoy.getDate() +
			"-" +
			(hoy.getMonth() + 1) +
			"-" +
			hoy.getFullYear();
		var hora =
			hoy.getHours() + ":" + hoy.getMinutes() + ":" + hoy.getSeconds();
		var fechaYHora = fecha + " " + hora;
		return fechaYHora;
	};

	db.collection("tasks").onSnapshot((querySnapshot) => {
		let docs = [];
		querySnapshot.forEach((doc) => {
			docs.push({ ...doc.data(), id: doc.id });
		});
		tasks = [...docs];
	});

	const addTask = async () => {
		await db
			.collection("tasks")
			.doc()
			.set({
				...task,
				createdAt: getCurrentDate(),
			});
		toastr.success("Product Added Successfully", "", {
			timeOut: 3000,
			progressBar: true,
			positionClass: "toast-bottom-right",
		});
	};

	const updateTask = async () => {
		await db.collection("tasks").doc(currentId).update(task);
		toastr.success("Product Updated Successfully", "", {
			timeOut: 3000,
			progressBar: true,
			positionClass: "toast-bottom-right",
		});
	};

	const editTask = (currentTask) => {
		editStatus = true;
		currentId = currentTask.id;
		task.name = currentTask.name;
		task.description = currentTask.description;
	};

	const deleteTask = async (id) => {
		await db.collection("tasks").doc(id).delete();
		toastr.success("Product Deleted Successfully", "", {
			timeOut: 3000,
			progressBar: true,
			positionClass: "toast-bottom-right",
		});
	};

	const handleSubmit = () => {
		if (!editStatus) {
			addTask();
		} else {
			updateTask();
		}

		task = { name: "", description: "" };
	};

	const onCancel = () => {
		editStatus = false;
		task = { name: "", description: "" };
	};
</script>

<div class="container p-4">
	<div class="row justify-content-center">
		<div class="col-md-8">
			<center>
				<h1>TODO APP USING SVELTE</h1>
			</center>
			<form
				on:submit|preventDefault={handleSubmit}
				class="card card-body"
			>
				<div class="form-group">
					<input
						bind:value={task.name}
						type="text"
						placeholder="Write a new task"
						class="form-control"
					/>
				</div>
				<div class="form-group">
					<textarea
						bind:value={task.description}
						rows="3"
						placeholder="Write a task description"
						class="form-control"
					/>
				</div>
				<button class="btn btn-primary">
					{#if !editStatus}Save {:else} Update {/if}
				</button>
				{#if editStatus}
					<button on:click={onCancel} class="btn btn-info"
						>Cancel</button
					>
				{/if}
			</form>

			{#each tasks as task}
				<div class="card card-body mt-2">
					<div class="d-flex justify-content-between">
						<h5>{task.name}</h5>
						<i
							class="material-icons"
							on:click={editTask(task)}
							style="vertical-align: middle;">edit</i
						>
					</div>

					<p>{task.description}</p>
					<p>{task.createdAt}</p>
					<button
						on:click={deleteTask(task.id)}
						class="btn btn-danger"
					>
						<i
							class="material-icons"
							style="vertical-align: middle;">delete_forever</i
						>
					</button>
				</div>
			{/each}
		</div>
	</div>
</div>

<style>
</style>



window.addEventListener('load', () => {
	grocerys = JSON.parse(localStorage.getItem('grocerys')) || [];
	const nameInput = document.querySelector('#name');
	const groceryForm = document.querySelector('#grocery-form');

	

	groceryForm.addEventListener('submit', e => {
		e.preventDefault();

		const grocery = {
			content: e.target.elements.content.value,
			category: e.target.elements.category.value,
			done: false,
			createdAt: new Date().getTime()
		}

		grocerys.push(grocery);

		localStorage.setItem('grocerys', JSON.stringify(grocerys));

		// Reset the form
		e.target.reset();

		DisplayGrocerys()
	})

	DisplayGrocerys()
})

function DisplayGrocerys () {
	const groceryList = document.querySelector('#grocery-list');
	groceryList.innerHTML = "";

	grocerys.forEach(grocery => {
		const groceryItem = document.createElement('div');
		groceryItem.classList.add('grocery-item');

		const label = document.createElement('label');
		const input = document.createElement('input');
		const span = document.createElement('span');
		const content = document.createElement('div');
		const actions = document.createElement('div');
		const edit = document.createElement('button');
		const deleteButton = document.createElement('button');

		input.type = 'checkbox';
		input.checked = grocery.done;
		span.classList.add('bubble');
		if (grocery.category == 'personal') {
			span.classList.add('personal');
		} else {
			span.classList.add('food');
		}
		content.classList.add('grocery-content');
		actions.classList.add('actions');
		edit.classList.add('edit');
		deleteButton.classList.add('delete');

		content.innerHTML = `<input type="text" value="${grocery.content}" readonly>`;
		edit.innerHTML = 'Edit';
		deleteButton.innerHTML = 'Delete';

		label.appendChild(input);
		label.appendChild(span);
		actions.appendChild(edit);
		actions.appendChild(deleteButton);
		groceryItem.appendChild(label);
		groceryItem.appendChild(content);
		groceryItem.appendChild(actions);

		groceryList.appendChild(groceryItem);

		if (grocery.done) {
			groceryItem.classList.add('done');
		}
		
		input.addEventListener('change', (e) => {
			grocery.done = e.target.checked;
			localStorage.setItem('grocerys', JSON.stringify(grocerys));

			if (grocery.done) {
				groceryItem.classList.add('done');
			} else {
				groceryItem.classList.remove('done');
			}

			DisplayGrocerys()

		})

		edit.addEventListener('click', (e) => {
			const input = content.querySelector('input');
			input.removeAttribute('readonly');
			input.focus();
			input.addEventListener('blur', (e) => {
				input.setAttribute('readonly', true);
				grocery.content = e.target.value;
				localStorage.setItem('grocerys', JSON.stringify(grocerys));
				DisplayGrocerys()

			})
		})

		deleteButton.addEventListener('click', (e) => {
			grocerys = grocerys.filter(g => g != grocery);
			localStorage.setItem('grocerys', JSON.stringify(grocerys));
			DisplayGrocerys()
		})

	})
}
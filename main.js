document.addEventListener("DOMContentLoaded", function () {

	const progressObj = {
		valueBar: 0,
		hide: false,
		animate: false
	}

	const circle = document.querySelectorAll('.circle')

	const inputValueBar = document.querySelector('.numberProgressBarInput')
	const progressBar = document.querySelector('.progress__progressBar')

	const toggleCheckboxAnimate = document.querySelector('.toggle-checkboxAnimate')
	const toggleCheckboxHide = document.querySelector('.toggle-checkboxHide')

	fetchData()

	async function fetchData() {
		try {
			const api = `https://cb7a494745af6c2a.mokky.dev/progressBar`

			let response = await fetch(api)
			let result = await response.json()

			console.log(result[0].valueBar)

			progressObj.valueBar = result[0].valueBar
			progressObj.hide = result[0].hide
			progressObj.animate = result[0].animate


			inputValueBar.value = result[0].valueBar
			let targetDegree = inputValueBar.value

			if (progressObj.animate) {
				progressBar.classList.add('animateBar')
				toggleCheckboxAnimate.checked = true
			}

			if (progressObj.hide) {
				progressBar.classList.add('hidden')
				toggleCheckboxHide.checked = true
			}


			toggleCheckboxAnimate.addEventListener('click', async function () {
				progressBar.classList.toggle('animateBar')
				progressObj.animate = !progressObj.animate
				console.log(progressObj) // JSON.stringify(progressObj.animate)

				fetch(`https://cb7a494745af6c2a.mokky.dev/progressBar/1`, {
					method: 'PATCH',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(progressObj)
				})

				console.log(response)
			})

			toggleCheckboxHide.addEventListener('click', async function () {
				progressBar.classList.toggle('hidden')
				progressObj.hide = !progressObj.hide
				fetch(`https://cb7a494745af6c2a.mokky.dev/progressBar/1`, {
					method: 'PATCH',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(progressObj)
				})
			})

			inputValueBar.addEventListener('input', async function () {

				if (inputValueBar.value < 0) {
					return inputValueBar.value = 0
				}

				progressObj.valueBar = inputValueBar.value

				fetch(`https://cb7a494745af6c2a.mokky.dev/progressBar/1`, {
					method: 'PATCH',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(progressObj)
				})

				renderCircle(inputValueBar.value)
			})


			renderCircle(targetDegree)

			function renderCircle(targetDegree) {


				let degree = 0

				circle.forEach(function (progress) {

					let interval = setInterval(function () {
						degree += 1

						if (degree > targetDegree) {
							clearInterval(interval)
							return
						}
						progress.style.background = `conic-gradient(#005cff ${degree}%, #eaf0f6 0%)`
					}, 10)
				}
				)
			}

		}
		catch (err) {
			console.log(err)
		}


	}



})
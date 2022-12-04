const openModal = () => document.getElementById('modal').classList.add('active')
const openModal2 = () => document.getElementById('modal2').classList.add('active')

const closeModal2 = () => {
    document.getElementById('modal2').classList.remove('active')
}

const closeModal = () => {
    clearFields()
    document.getElementById('modal').classList.remove('active')
}

const getLocalStorage = () => JSON.parse(localStorage.getItem('dbalunos')) ?? []
const setLocalStorage = (dbaluno) => localStorage.setItem("dbalunos", JSON.stringify(dbaluno))

const deleteStudent = (index) => {
    const dbaluno = readStudent()
    dbaluno.splice(index, 1)
    setLocalStorage(dbaluno)
}

const updateStudent = (index, student) => {
    const dbaluno = readStudent()
    dbaluno[index] = student
    setLocalStorage(dbaluno)
}

const readStudent = () => getLocalStorage()

const createStudent = (student) => {
    const dbaluno = getLocalStorage()
    dbaluno.push (student)
    setLocalStorage(dbaluno)
}

const isValidFields = () => {
    return document.getElementById('form').reportValidity()
}

const clearFields = () => {
    const fields = document.querySelectorAll('.modal-field')
    fields.forEach(field => field.value = "")
    document.getElementById('nome').dataset.index = 'new'
}

const saveStudent = () => {
    debugger
    if (isValidFields()) {
        const student = {
            nome: document.getElementById('nome').value,
            email: document.getElementById('email').value,
            data: document.getElementById('data').value,
            celular: document.getElementById('celular').value,
            matricula: document.getElementById('matricula').value,
            curso: document.getElementById('curso').value,
            turno: document.getElementById('turno').value            
        }
        const index = document.getElementById('nome').dataset.index
        if (index == 'new') {
            createStudent(student)
            updateTable()
            closeModal()
        } else {
            updateStudent(index, student)
            updateTable()
            closeModal()
        }
    }
}

const createRow = (student, index) => {
    const newRow = document.createElement('tr')
    newRow.innerHTML = `
        <td class="records">${student.nome}</td>
        <td class="records">${student.email}</td>
        <td class="records">${student.data}</td>
        <td class="records">${student.celular}</td>
        <td class="records">${student.matricula}</td>
        <td class="records">${student.curso}</td>
        <td class="records">${student.turno}</td>
        <td>
            <button type="button" class="button green" id="edit-${index}">Editar</button>
            <button type="button" class="button red" id="delete-${index}" >Excluir</button>
        </td>
    `
    document.querySelector('#tableStudent>tbody').appendChild(newRow)
}

const clearTable = () => {
    const rows = document.querySelectorAll('#tableStudent>tbody tr')
    rows.forEach(row => row.parentNode.removeChild(row))
}

const updateTable = () => {
    const dbaluno = readStudent()
    clearTable()
    dbaluno.forEach(createRow)
}

const fillFields = (student) => {
    document.getElementById('nome').value = student.nome
    document.getElementById('email').value = student.email
    document.getElementById('data').value = student.data
    document.getElementById('celular').value = student.celular
    document.getElementById('matricula').value = student.matricula
    document.getElementById('curso').value = student.curso
    document.getElementById('turno').value = student.turno
    document.getElementById('nome').dataset.index = student.index
}

const editStudent = (index) => {
    const student = readStudent()[index]
    student.index = index
    fillFields(student)
    openModal()
}

const editDelete = (event) => {
    if (event.target.type == 'button') {

        const [action, index] = event.target.id.split('-')

        if (action == 'edit') {
            editStudent(index)
        } else {
            const student = readStudent()[index]
            let avisoDelete = document.querySelector('#avisoDelete')

            avisoDelete.textContent = `Deseja realmente excluir o aluno ${student.nome}`
            openModal2()

        // APAGAR O REGISTRO
            document.getElementById('apagar').addEventListener('click', () => {
                deleteStudent(index)
                updateTable()
                closeModal2()
            })
        }
    }
}

updateTable()

document.getElementById('cadastrarAluno').addEventListener('click', openModal)

document.getElementById('modalClose').addEventListener('click', closeModal)

document.getElementById('modalClose2').addEventListener('click', closeModal2)

document.getElementById('salvar').addEventListener('click', saveStudent)

document.querySelector('#tableStudent>tbody').addEventListener('click', editDelete)

document.getElementById('cancelar').addEventListener('click', closeModal)

document.getElementById('cancelar2').addEventListener('click', closeModal2)

const chk = document.getElementById("chk");
chk.addEventListener("change", () => {
    document.body.classList.toggle("dark");
})
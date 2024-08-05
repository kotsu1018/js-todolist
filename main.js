// 配列の作り方空の状態
const todos = [];
let todoStatus = 'all';

// camelcase = ラクダのようにスペルを書く
// ALLをすると全てのclassを持ってくる
// nodelistの形をarrayに変換する方法は[...]をつけること
const todoStatusList = [...document.querySelectorAll('.todo-status')];
const todoSubmitButton = document.querySelector('#todo__submit__button');
const todoInput = document.querySelector('#todo__input');
const todoList = document.querySelector('.todo__list');

// クリックイベントに関する情報を持っている
const setStatus = (event) => {
    todoStatus = event.currentTarget.id;
};

// radioボタン全部にイベントリスナーをつけると長くなるから、mapを使って１行で記載できる
// mapは中に入ってる数によって、処理される
todoStatusList.map((status) => status.addEventListener('click', setStatus));

const updateTodo = () => {
    todoList.replaceChildren();
    if (todoStatus === 'all') {
        createTodo(todos);
    } else {
        // filter条件に合うものを返す
        // todo.statusとtodoStatusのstatusが同じものを返す(===)
        createTodo(todos.filter((todo) => todo.status === todoStatus));
    }
};

const changeStatus = (newStatus, todo) => {
    todo.status = newStatus;
    updateTodo();
};

const createStatusButton = (todo) => {
    const buttonList = document.createElement('div');
    const todoButton = document.createElement('button');
    const progressButton = document.createElement('button');
    const doneButton = document.createElement('button');

    buttonList.classList.add('button__list');
    todoButton.classList.add('todo__button');
    progressButton.classList.add('progress__button');
    doneButton.classList.add('done__button');

    // buttonの中に入る文字のこと
    todoButton.innerText = 'todo';
    progressButton.innerText = 'progress';
    doneButton.innerText = 'done';

    if (todo.status === 'todo') {
        // todoの場合他のbuttonを[]に記入しmapで一つづつ順番に(button)に入って以降のコードを実行する
        [progressButton, doneButton].map((button) => {
            // appendは子供を追加する（divの中にbuttonが追加された
            buttonList.append(button);
            button.addEventListener('click', (event) => changeStatus(event.currentTarget.innerText, todo));
        });
        return buttonList;
    }

    if (todo.status === 'progress') {
        [todoButton, doneButton].map((button) => {
            buttonList.append(button);
            button.addEventListener('click', (event) => changeStatus(event.currentTarget.innerText, todo));
        });
        return buttonList;
    }

    if (todo.status === 'done') {
        [todoButton, progressButton].map((button) => {
            buttonList.append(button);
            button.addEventListener('click', (event) => changeStatus(event.currentTarget.innerText, todo));
        });
        return buttonList;
    }
};

// 関数を使う場所より上に記入する
const addTodoList = () => {
    // value空じゃない場合のみ配列にデータを入れる
    if (todoInput.value) {
        todos.push({
            id: todos.length,
            todo: todoInput.value,
            status: todoStatus === 'all' ? 'todo' : todoStatus,
        });
        todoInput.value = '';
        updateTodo();
    }
};

// 関数はインプットアウトプットがある、関数を呼び出すと関数内のコードが実行される
// todosは記入したもの。何個入るかわからない、mapは中に入ってる数によって処理される
// mapは命令したものを一つづつに与える
// (todos)はインプットでcreateTodoの中に入って以下のコードが実行される
const createTodo = (todos) => {
    todos.map((todo) => {
        // htmlタグをjsで記入する
        const todoWrapper = document.createElement('li');
        const todoItem = document.createElement('div');
        // ボタンは関数
        const statusButton = createStatusButton(todo);

        // のちのcssのためにdivにクラス名追加する
        todoWrapper.classList.add('todo__wrapper');
        todoItem.classList.add('todo_item');

        // todoitemsでプロパティを持ってくる
        // liのidとtodoのidを一致させる
        todoItem.id = todo.id;
        // lengthの長さに＋１で、リストを表示するとき、１から始められるようにする
        todoItem.innerText = `${todo.id + 1}. ${todo.todo}`;
        // divの中にliとbuttonを追加
        todoWrapper.append(todoItem, statusButton);
        // ulの中にdivを追加
        todoList.append(todoWrapper);
    });
};

const showTodoStatus = (event) => {
    todoStatus = event.currentTarget.id;
    updateTodo();
};

todoStatusList.map((status) => status.addEventListener('click', showTodoStatus));
// ボタンを持ってくる
todoSubmitButton.addEventListener('click', addTodoList);

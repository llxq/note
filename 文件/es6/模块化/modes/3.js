const a = 12;
const b = 5;

const show = () => {
    console.log(a + b);
}
const sun = () => {
    console.log('this is sun');
}

export {
    a,
    b,
    show,
    sun
}

function preson() {
    this.showName = () => {
        return '>>>>'
    }
}


export default {
    preson
}
import toast from "react-hot-toast";

export const isValidEmail = (email: string) => {
    const re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!re.test(email)) {
        toast.error('Invalid email address');
        return false;
    }
    return true;
}

export const isValidPassword = (password: string) => {
    if (password.length < 4) {
        toast.error('Password must be at least 4 characters long');
        return false;
    }
    return true;
}

export const isValidName = (name: string) => {
    if (name.length < 2) {
        toast.error('Name must be at least 3 characters long');
        return false;
    }
    return true;
}
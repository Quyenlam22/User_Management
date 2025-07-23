import './style.css'
import AdminUser from './classes/admin-user.class.ts';
import UserAccount from './classes/user-account.class.ts';
import type { User } from './models/user.interface.ts';
import { createUser } from './utils/createUser.ts';
import { formatUserInfo } from './utils/formatUserInfo.ts';

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div class="container">
    <div class="alert flex justify-center"></div>
    <h1 class="text-2xl font-bold text-center mb-5">
      👥 User Management
    </h1>
    <h2 class="text-2xl font-bold mb-6 text-center">Create New User</h2>
    <form id="userForm" class="space-y-4">
      <div>
        <label for="username" class="relative">
          <input
            type="text"
            name="username"
            id="username"
            placeholder=""
            required
            class="peer mt-1 w-full px-4 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
          <span
            class="absolute inset-y-0 start-3 -translate-y-5 bg-white px-0.5 text-sm font-medium text-gray-700 transition-transform peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-5"
          >
            Username
          </span>
        </label>
      </div>
      <div>
        <label for="email" class="relative">
          <input
            type="email"
            name="email"
            id="email"
            placeholder=""
            required
            class="peer mt-1 w-full px-4 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
          <span
            class="absolute inset-y-0 start-3 -translate-y-5 bg-white px-0.5 text-sm font-medium text-gray-700 transition-transform peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-5"
          >
            Email
          </span>
        </label>
      </div>
      <div>
        <label for="password" class="relative">
          <input
            type="password"
            name="password"
            id="password"
            placeholder=""
            required
            class="peer mt-1 w-full px-4 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
          <span
            class="absolute inset-y-0 start-3 -translate-y-5 bg-white px-0.5 text-sm font-medium text-gray-700 transition-transform peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-5"
          >
            Password
          </span>
        </label>
      </div>
      <div>
        <label for="role" class="relative">
          <select
            name="role"
            id="role"
            placeholder=""
            class="peer mt-1 w-full px-4 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="user" selected>User</option>
            <option value="admin">Admin</option>
            <option value="guest">Guest</option>
          </select>
          <span
            class="absolute inset-y-0 start-3 -translate-y-5 bg-white px-0.5 text-sm font-medium text-gray-700 transition-transform peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-5"
          >
            Role
          </span>
        </label>
      </div>
      <button
        type="submit"
        class="inline-block rounded-sm bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-[2px] hover:text-white text-sm font-medium text-white transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-xl focus:ring-3 focus:outline-hidden"
      >
        <span
          class="block rounded-full px-6 py-2 font-medium transition-all duration-300 group-hover:bg-transparent"
        >
          Create User
        </span>
      </button>
    </form>

    <div id="userInfo" class="my-4 font-semibold text-lg"></div>

  </div>
`;

const form = document.getElementById("userForm") as HTMLFormElement;
// const emailInput = document.querySelector("#email") as HTMLInputElement;
const alertMessage = document.querySelector(".alert") as HTMLDivElement;
const userInfo = document.getElementById("userInfo") as HTMLDivElement;

form.onsubmit = (e: SubmitEvent) => {
  e.preventDefault();

  const username = (form.elements.namedItem("username") as HTMLInputElement)
    .value;
  const email = (form.elements.namedItem("email") as HTMLInputElement).value;
  const password = (form.elements.namedItem("password") as HTMLInputElement)
    .value;
  const role = (form.elements.namedItem("role") as HTMLSelectElement).value;

  let user;

  if (role === "admin") {
    user = new AdminUser(username, email, password);
  } else {
    user = new UserAccount(username, email, role as "user" | "guest", password);
  }

  if (!user.validatePassword()) {
    alertMessage.innerHTML = `
      <div role="alert" class="shadow-xl fixed z-999 transition duration-300 ease-in-out border-s-4 border-red-700 bg-red-50 p-4">
      <div class="flex items-center gap-2 text-red-700">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-5">
          <path
            fill-rule="evenodd"
            d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
            clip-rule="evenodd"
          />
        </svg>
        <strong class="font-medium">Invalid password length for role: ${role}</strong>
      </div>
    </div>
    `;
  }
  else {
    const newUser: Partial<User> = {
      username: username,
      // email: emailInput.value,
      email: email,
      role: role as "admin" | "user" | "guest",
    };
    console.log(createUser(newUser));

    userInfo.textContent = formatUserInfo(user);

    form.reset();
    alertMessage.innerHTML = `
      <div role="alert" class="fixed z-999 rounded-md border border-gray-300 bg-white py-4 px-8 shadow-sm">
        <div class="flex gap-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-6 text-green-600"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <div class="flex-1">
            <strong class="font-medium text-gray-900"> Create new user successfully! </strong>
          </div>
        </div>
      </div>
    `
  }
  setTimeout(() => {
  const alertDiv = alertMessage.querySelector("div");
  if (alertDiv) {
    alertDiv.classList.add("fade-out"); // Thêm class mờ dần
    setTimeout(() => {
      alertMessage.innerHTML = ""; // Xóa sau khi mờ
    }, 500); // Chờ hiệu ứng mờ chạy xong (500ms)
  }
}, 1500);
};

<template>
  <div class="all-content container">
    <div class="filter-left">
      <div class="search-container">

        <img src="../../../assets/search.svg" alt="Search Icon" />
        <input type="text" class="search-input" :placeholder="$t('Search')" />
      </div>
      <button class="btn-export">{{ $t("Export") }}</button>
      <button class="btn-refresh" title="Notifications">
        <img src="../../../assets/refresh.svg" class="icon" />
      </button>
    </div>
    <div class="add">
      <button type="button" class="btn btn-primary mb-3 btn-add" data-bs-toggle="modal" data-bs-target="#exampleModal"
        @click="openModalForAdd">
        <img src="../../../assets/plus.svg" class="icon-plus" />
        <span>{{ $t('Add User') }}</span>
      </button>
    </div>
  </div>
  <table class="table">
    <thead>
      <tr>
        <th><input type="checkbox" @click="toggleAllCheckboxes" /></th>
        <th></th>
        <th>
          {{ $t('Name') }}
          <span class="th-asc" @click="sortBy('name', 'asc')">↑</span>
          <span class="th-asc" @click="sortBy('name', 'desc')">↓</span>
        </th>
        <th>
          {{ $t('Username') }}
          <span class="th-asc" @click="sortBy('username', 'asc')">↑</span>
          <span class="th-asc" @click="sortBy('username', 'desc')">↓</span>
        </th>
        <th>{{ $t('Email') }}</th>
        <th>{{ $t('Financial') }}</th>
        <th>{{ $t('User Type') }}</th>
        <th>{{ $t('Roles') }}</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(user, index) in paginatedUsers" :key="user.id">
        <td>
          <input type="checkbox" v-model="selectedUsers" :value="user.id" />
        </td>
        <td>{{ (currentPage - 1) * usersPerPage + (index + 1) }}</td>


        <td>{{ user.name }}</td>
        <td>{{ user.username }}</td>
        <td>{{ user.email }}</td>
        <td>{{ user.financial }}</td>
        <td>{{ user.userType }}</td>
        <td>{{ user.roles }}</td>

        <td>
          <div class="dropdown">
            <button class="btn btn-link" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown"
              aria-expanded="false">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                class="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                <path
                  d="M3 9.5a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0zm0-5a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0zm0 10a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0z" />
              </svg>
            </button>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <li>
                <a class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#exampleModal"
                  @click.prevent="openModalForEdit(user)">Edit</a>
              </li>
              <li>
                <a class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#detailsModel"
                  @click.prevent="viewDetails(user)">Details</a>
              </li>
              <li>
                <a class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#deleteModal"
                  @click.prevent="confirmDeleteUser(user.id)">Delete</a>
              </li>
            </ul>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
  <nav aria-label="Page navigation example container ">
    <ul class="pagination">
      <li class="page-item" :class="{ disabled: currentPage === 1 }">
        <a class="page-link" href="#" aria-label="Previous" @click.prevent="changePage(currentPage - 1)">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li class="page-item" v-for="page in totalPages" :key="page" :class="{ active: currentPage === page }">
        <a class="page-link" href="#" @click.prevent="changePage(page)">{{
          page
        }}</a>
      </li>
      <li class="page-item" :class="{ disabled: currentPage === totalPages }">
        <a class="page-link" href="#" aria-label="Next" @click.prevent="changePage(currentPage + 1)">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>


  <div>
    <UserModal ref="userModalRef" @submitForm="addUser" @update:isEditMode="isEditMode = $event"
      @update:user="user = $event" :isEditMode="isEditMode" :user="user" />
  </div>
  <div class="modal fade" id="deleteModal" tabindex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="deleteModalLabel">Confirm Delete</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">Are you sure you want to delete this user?</div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
            Close
          </button>
          <button type="button" class="btn btn-danger" @click="deleteUser" data-bs-dismiss="modal">
            Confirm
          </button>
        </div>
      </div>
    </div>
  </div>
  <div class="modal fade" id="detailsModel" tabindex="-1" aria-labelledby="detailsModelLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content" v-if="selectedUser">
        <div class="modal-header">
          <h5 class="modal-title" style="color: gray" id="exampleModalLabel">
            {{ $t(" User details") }}
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="d-flex justify-content-between mt-3 mb-4 px-4" style="">
          <h2>{{ selectedUser?.name }}</h2>
          <button class="btn-profile">
            {{ $t(" User Profile") }}
          </button>
        </div>
        <div class="modal-body body">
          <div class="one">
            <div>
              <span> {{ $t(" Name") }}</span>
              <p>{{ selectedUser?.name }}</p>
            </div>
            <div>
              <span> {{ $t(" Username") }}</span>
              <p>{{ selectedUser?.username }}</p>
            </div>
          </div>
          <hr />
          <div class="one">
            <div>
              <span> {{ $t(" Email") }} </span>
              <p>{{ selectedUser?.email }}</p>
            </div>
            <div>
              <span> {{ $t(" Financial") }}</span>
              <p>{{ selectedUser?.financial }}</p>
            </div>
          </div>
          <hr />
          <div class="one">
            <div>
              <span> {{ $t(" Domain") }} </span>
              <p>{{ selectedUser?.userType }}</p>
            </div>
            <div>
              <span> {{ $t(" User Type") }}</span>
              <p>{{ selectedUser?.userType }}</p>
            </div>
          </div>
          <hr />
          <div class="one">
            <div>
              <span> {{ $t(" Roles") }}</span>
              <p class="Roles-style">
                {{ selectedUser?.roles }}
              </p>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary footer-details" data-bs-dismiss="modal">
            {{ $t(" Close") }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.all-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0px;
  width: 90%;
  margin: 0 auto;
}

.filter-left {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 10px;
  gap: 10px;
}

.icon {
  width: 24px;
  height: 24px;
  fill: #0601ae;
}

.icon-plus {
  width: 10px;
  height: 10px;
  fill: #ffffff;
}

.search-container {
  display: flex;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px 40px 10px 10px;
  align-items: center;

  border-radius: 5px;
  background-color: #fff;
  color: rgb(49, 49, 49);
  font-size: 16px;
}

.search-input {
  width: 100%;
  background-color: transparent;
  border: none;
  font-size: 16px;
  outline: none;

}

.search-container img {
  width: 20px;
  height: 20px;
  margin-right: 5px;
}

.search-placeholder {
  position: absolute;
  top: 50%;
  left: 10px;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  pointer-events: none;
  transition: opacity 0.3s ease;
}

.search-placeholder img {
  width: 20px;
  height: 20px;
  margin-right: 5px;
}

.search-input:focus+.search-placeholder,
.search-input:hover+.search-placeholder {
  opacity: 0;
}

.btn-export {
  padding: 10px 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #fff;
  color: rgb(49, 49, 49);
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
}

.btn-export:hover {
  background-color: #0056b3;
}

.btn-add {
  display: flex;
  gap: 10px;
  padding: 10px 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: green;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
  align-items: center;
}

.btn-refresh {
  padding: 10px 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #fff;
  cursor: pointer;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
}

.btn-refresh:hover {
  background-color: #0056b3;
}

.one {
  display: flex;
  justify-content: space-between;
}

.footer-details {
  margin-top: 10px;
  width: 100%;
  background-color: transparent;
  border-radius: 6px;
  border: solid 1px gray;
  padding: 10px 0px;
  color: rgb(49, 49, 49);
}

.pagination {
  justify-content: flex-end;
  width: 90%;
  margin: 20px auto;
}

.page-item.active .page-link {
  background-color: #007bff;
  color: white;

  border-radius: 50%;
}

.page-item .page-link {
  background-color: transparent;
  border: none;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.page-link {
  color: rgb(75, 84, 93);
  text-decoration: none;
}

.page-link:hover {
  color: #007bff;
}


.table {
  width: 90%;
  margin: 0 auto;
  background-color: transparent !important;
  border-radius: 10px;
  border: 1px solid #ccc;
}

.th-asc {
  cursor: pointer;
}

.Roles-style {
  background-color: blue;
  color: #fff;
  border-radius: 2px;
  padding: 2px 4px;
}

.btn-profile {
  background-color: transparent !important;
  border: solid 1px gray;
  border-radius: 5px;
  color: gray;
}
</style>

<script setup>
import { ref, onMounted, computed } from "vue";
import UserModal from "./UserModal.vue";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
const users = ref([]);
const userIdToDelete = ref(null);
const selectedUsers = ref([]);
const currentPage = ref(1);
const usersPerPage = 10;
const sortColumn = ref("");
const sortOrder = ref("");
const userIdToEdit = ref(null);
const userModalRef = ref(null);
const selectedUser = ref({});
const user = ref({
  name: "",
  username: "",
  email: "",
  financial: "",
  userType: "",
  roles: "",
});
const isEditMode = ref(false);
const totalPages = computed(() => Math.ceil(users.value.length / usersPerPage));

onMounted(() => {
  users.value = [
    {
      id: 1,
      name: "John Doe",
      username: "jdoe",
      email: "jdoe@example.com",
      financial: "1000",
      userType: "Admin",
      roles: "Admin",
    },
    {
      id: 2,
      name: "Ahmed Smith",
      username: "jsmith",
      email: "jsmith@example.com",
      financial: "2000",
      userType: "User",
      roles: "User",
    },
    {
      id: 3,
      name: "John Doe",
      username: "jdoe",
      email: "jdoe@example.com",
      financial: "1000",
      userType: "Admin",
      roles: "Admin",
    },
    {
      id: 4,
      name: "Jane Smith",
      username: "jsmith",
      email: "jsmith@example.com",
      financial: "2000",
      userType: "User",
      roles: "User",
    },
    {
      id: 5,
      name: "John Doe",
      username: "jdoe",
      email: "jdoe@example.com",
      financial: "1000",
      userType: "Admin",
      roles: "Admin",
    },
    {
      id: 6,
      name: "Jane Smith",
      username: "jsmith",
      email: "jsmith@example.com",
      financial: "2000",
      userType: "User",
      roles: "User",
    },
    {
      id: 7,
      name: "John Doe",
      username: "jdoe",
      email: "jdoe@example.com",
      financial: "1000",
      userType: "Admin",
      roles: "Admin",
    },
    {
      id: 8,
      name: "Jane Smith",
      username: "jsmith",
      email: "jsmith@example.com",
      financial: "2000",
      userType: "User",
      roles: "User",
    },
    {
      id: 9,
      name: "Jane Smith",
      username: "jsmith",
      email: "jsmith@example.com",
      financial: "2000",
      userType: "User",
      roles: "User",
    },
    {
      id: 10,
      name: "John Doe",
      username: "jdoe",
      email: "jdoe@example.com",
      financial: "1000",
      userType: "Admin",
      roles: "Admin",
    },
    {
      id: 11,
      name: "Jane Smith",
      username: "jsmith",
      email: "jsmith@example.com",
      financial: "2000",
      userType: "User",
      roles: "User",
    },
    {
      id: 12,
      name: "John Doe",
      username: "jdoe",
      email: "jdoe@example.com",
      financial: "1000",
      userType: "Admin",
      roles: "Admin",
    },
    {
      id: 13,
      name: "Jane Smith",
      username: "jsmith",
      email: "jsmith@example.com",
      financial: "2000",
      userType: "User",
      roles: "User",
    },
  ];
});
const sortBy = (column, order) => {
  sortColumn.value = column;
  sortOrder.value = order;
  users.value.sort((a, b) => {
    if (a[column] < b[column]) return order === "asc" ? -1 : 1;
    if (a[column] > b[column]) return order === "asc" ? 1 : -1;
    return 0;
  });
};
const openModalForAdd = () => {
  resetForm();
  isEditMode.value = false;
  const modal = new bootstrap.Modal(document.getElementById("exampleModal"));
  modal.show();
};

const paginatedUsers = computed(() => {
  const start = (currentPage.value - 1) * usersPerPage;
  const end = start + usersPerPage;
  return users.value.slice(start, end);
});

const changePage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
};
const openModalForEdit = (userData) => {
  user.value = { ...userData };
  isEditMode.value = true;
  userIdToEdit.value = userData.id;
  const modal = new bootstrap.Modal(document.getElementById("exampleModal"));
  modal.show();
};

const addUser = (formData) => {
  if (userIdToEdit.value !== null) {
    const index = users.value.findIndex((user) => user.id === userIdToEdit.value);
    if (index !== -1) {
      users.value[index] = formData;
    }
  } else {
    users.value.push({ id: Date.now(), ...formData });
  }
}
const viewDetails = (user) => {
  selectedUser.value = user;
  const modal = new bootstrap.Modal(document.getElementById('detailsModel'));
  modal.show();
};

const confirmDeleteUser = (id) => {
  userIdToDelete.value = id;
  const modal = new bootstrap.Modal(document.getElementById("deleteModal"));
  modal.show();
};

const deleteUser = () => {
  if (userIdToDelete.value !== null) {
    users.value = users.value.filter(
      (user) => user.id !== userIdToDelete.value
    );
    userIdToDelete.value = null;

    if (paginatedUsers.value.length === 0 && currentPage.value > 1) {
      currentPage.value--;
    }
  }
  const modal = bootstrap.Modal.getInstance(
    document.getElementById("deleteModal")
  );
  if (modal) {
    modal.hide();
  }
};
const toggleAllCheckboxes = (event) => {
  if (event.target.checked) {
    selectedUsers.value = users.value.map((user) => user.id);
  } else {
    selectedUsers.value = [];
  }
};
const resetForm = () => {
  user.value = {
    name: "",
    username: "",
    email: "",
    financial: "",
    userType: "",
    roles: "",
  };
  password.value = "";
  confirmPassword.value = "";
};
</script>
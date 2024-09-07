<script lang="ts">
import { defineComponent } from 'vue'

import eventBus from '../../consumable/eventBus'
import supabase, {
  type Query,
  DBOperations,
  FilterTypes,
  type Response
} from '../../consumable/externals/supabase'
import { projectConstants, projectTableColumns } from '../../consumable/constants/projects'
import { type Project, type ProjectPage } from '../../consumable/models/projects'

export default defineComponent({
  data(): ProjectPage {
    return {
      projects: { company: [], personal: [] },
      isPersonalProjectEmpty: false,
      IsCompanyProjectEmpty: false,
      lineCount: 0,
      contentWrapElement: document.getElementsByClassName('')[0],
      resizeObserver: new ResizeObserver(() => {})
    }
  },
  methods: {
    // Mehod to fetch company projects
    fetchCompanyProjects(tags: Array<String>) {
      let req: Query = {
        operation: DBOperations.FETCH,
        table: projectConstants.SUPABASE_TABLE_PROJECTS
      }
      req.filters = [
        {
          type: FilterTypes.EQ,
          column: projectTableColumns.TYPE,
          value: projectConstants.PROJECT_TYPE_COMPANY
        }
      ]
      if (tags && tags.length > 0) {
        req.filters.push({
          type: FilterTypes.OVERLAP,
          column: projectTableColumns.TAG,
          value: tags
        })
      }

      supabase
        .executeQuery(req)
        .then((response: Response) => {
          if (this.projects && this.projects.company) {
            this.projects.company = response.data as Array<Project>
            this.IsCompanyProjectEmpty = this.projects.company.length <= 0
          }
        })
        .catch((err: Error) => {
          console.log(err)
          eventBus.emit('notify', 'error getting company projects')
        })
    },

    // Mehod to fetch personal projects
    fetchPersonalProjects(tags: Array<String>) {
      let req: Query = {
        operation: DBOperations.FETCH,
        table: projectConstants.SUPABASE_TABLE_PROJECTS
      }
      req.filters = [
        {
          type: FilterTypes.EQ,
          column: projectTableColumns.TYPE,
          value: projectConstants.PROJECT_TYPE_PERSONAL
        }
      ]
      if (tags && tags.length > 0) {
        req.filters.push({
          type: FilterTypes.OVERLAP,
          column: projectTableColumns.TAG,
          value: tags
        })
      }
      supabase
        .executeQuery(req)
        .then((response: Response) => {
          if (this.projects && this.projects.personal) {
            this.projects.personal = response.data as Array<Project>
            this.isPersonalProjectEmpty = this.projects.personal.length <= 0
          }
        })
        .catch((err: Error) => {
          console.log(err)
          eventBus.emit('notify', 'error getting personal projects')
        })
    }
  },
  beforeMount() {
    this.fetchCompanyProjects([])
    this.fetchPersonalProjects([])
    eventBus.on('filterProjects', (filteredStack: Array<String>) => {
      this.fetchCompanyProjects(filteredStack)
      this.fetchPersonalProjects(filteredStack)
    })
  },
  mounted() {
    eventBus.emit('openTab', 'projects', '/projects')
    this.contentWrapElement = document.getElementById('personal-project-row')
    this.resizeObserver = new ResizeObserver((entries) => {
      let count = Math.round(entries[0].contentRect.bottom / 15)
      if (count < 35) {
        this.lineCount = 35
      } else {
        this.lineCount = count
      }
    })
    this.resizeObserver.observe(this.contentWrapElement as Element)
  },
  unmounted() {
    this.resizeObserver.unobserve(this.contentWrapElement as Element)
  }
})
</script>

<template>
  <div class="container">
    <line-number :totalLine="lineCount"></line-number>
    <div class="card-container">
      <p class="code-comments" v-if="!IsCompanyProjectEmpty">// Company Projects</p>
      <div class="row row-cols-3">
        <div class="col card-wrap" :key="project.id" v-for="(project, i) in projects?.company">
          <p class="project-comment">
            <span class="code-blue">Project {{ i + 1 }} </span>
            <span class="code-comments"> // {{ project.name }}</span>
          </p>
          <div class="card">
            <div class="card-img-wrap">
              <img :src="project.image" class="card-img-top" alt="..." />
            </div>
            <div class="card-body">
              <div class="card-title-wrap">
                <h5 class="card-title">{{ project.name }}</h5>
                <span
                  :class="['badge', project.status === 'completed' ? 'completed' : 'in-progress']"
                >
                  {{ project.status }}
                </span>
              </div>
              <p class="card-text code-comments">{{ project.description }}</p>
              <a :href="project.redirect" class="btn" target="_blank">view-project</a>
            </div>
          </div>
        </div>
      </div>
      <p class="code-comments" v-if="!isPersonalProjectEmpty">// Personal Projects</p>
      <div id="personal-project-row" class="row row-cols-3">
        <div class="col card-wrap" :key="project.id" v-for="(project, i) in projects?.personal">
          <p class="project-comment">
            <span class="code-blue">Project {{ i + 1 }} </span>
            <span class="code-comments"> // {{ project.name }}</span>
          </p>
          <div class="card">
            <div class="card-img-wrap">
              <img :src="project.image" class="card-img-top" alt="..." />
            </div>
            <div class="card-body">
              <div class="card-title-wrap">
                <h5 class="card-title">{{ project.name }}</h5>
                <span
                  :class="['badge', project.status === 'completed' ? 'completed' : 'in-progress']"
                >
                  {{ project.status }}
                </span>
              </div>
              <p class="card-text code-comments">{{ project.description }}</p>
              <a :href="project.redirect" class="btn" target="_blank">view-project</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  min-width: 100%;
  height: 100%;
  color: #ffff;
  margin: 0 !important;
  padding: 0 !important;
  overflow-y: scroll;
}

.container::-webkit-scrollbar {
  display: none;
}

.card-container {
  width: 100%;
  height: 100%;
  padding: 7px 0 0 0;
}

.card-container .code-comments {
  margin: 0;
  padding: 0px 0 5px 0;
}

.row {
  width: 100%;
  padding: 10px 0px 23px 0;
}

.col {
  max-width: 325px;
}

.project-comment {
  width: 290px;
  margin: 0 0 0 20px;
}

.card {
  height: 300px;
  min-width: 300px;
  max-width: 300px;
  border-radius: 15px 15px;
  overflow: hidden;
  background: #181818;
  border: 1px solid #2b2b2b;
  margin: 10px;
}

.card-img-wrap {
  box-sizing: border-box;
  border: 1px solid #1e2d3d;
  min-height: 150px;
  overflow: hidden;
  animation: 1s forwards;
  animation-name: image-push-down;
}

.card:hover > .card-img-wrap {
  animation: 1s forwards;
  animation-name: image-push-up;
}

@keyframes image-push-down {
  from {
    min-height: 50px;
  }
  to {
    min-height: 150px;
  }
}

@keyframes image-push-up {
  from {
    min-height: 150px;
  }
  to {
    min-height: 50px;
  }
}

.card-body {
  max-height: 70px;
  animation: 1s forwards;
  animation-name: detail-push-down;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
}

.card:hover > .card-body {
  animation: 1s forwards;
  animation-name: detail-push-up;
}
@keyframes detail-push-up {
  from {
    min-height: 70px;
  }
  to {
    min-height: 250px;
  }
}

@keyframes detail-push-down {
  from {
    min-height: 250px;
  }
  to {
    min-height: 70px;
  }
}

.card-title-wrap {
  display: flex;
  justify-content: space-between;
  align-content: center;
  width: 100%;
}

.card-title {
  font-size: 18px;
}

.card-text {
  font-size: 14px;
  opacity: 0;
  animation: 1s forwards;
  animation-name: hide;
}

.badge {
  color: #181818;
  width: 100px;
  height: 20px;
  text-align: center;
}

.completed {
  background: #74c991;
}

.in-progress {
  background: #9cdcff;
}

.btn {
  opacity: 0;
  animation: 1s forwards;
  animation-name: hide;
}

.btn:hover {
  text-decoration: none;
  color: #ffff;
}

.card:hover > .card-body > .card-text {
  animation: 1s forwards;
  animation-name: show;
}

.card:hover > .card-body > .btn {
  animation: 1s forwards;
  animation-name: show;
}

@keyframes show {
  from {
    opacity: 0;
  }
  30% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.5;
  }
  700% {
    opacity: 0.7;
  }
  to {
    opacity: 1;
  }
}

@keyframes hide {
  from {
    opacity: 1;
  }
  30% {
    opacity: 0.7;
  }
  50% {
    opacity: 0.5;
  }
  700% {
    opacity: 0.3;
  }
  to {
    opacity: 0;
  }
}

/*media query for screen width less than 1300px */
@media all and (max-width: 1350px) {
  .card {
    height: 300px;
    min-width: 300px;
    max-width: 500px;
    border-radius: 15px 15px;
    overflow: hidden;
    background: #181818;
    border: 1px solid #2b2b2b;
    margin: 10px;
    float: left;
  }
}

/*media query for screen width less than 1300px */
@media all and (min-width: 1500px) {
  .col {
    max-width: 400px;
  }

  .card {
    height: 300px;
    min-width: 300px;
    max-width: 500px;
    border-radius: 15px 15px;
    overflow: hidden;
    background: #181818;
    border: 1px solid #2b2b2b;
    margin: 10px;
    float: left;
  }
}

/*media query for screen width less than 1300px */
/* @media all and (min-width: 972px) {
   .container {
    height: ;
   }
} */
</style>

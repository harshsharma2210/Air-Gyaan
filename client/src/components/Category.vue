<template>
  <v-container fluid>
    <router-view />
    <v-row dense>
      <v-col
        v-for="card in cards"
        :key="card.title"
        :cols="card.flex"
        :to="card.link"
        m-3
      >
        <v-hover v-slot:default="{ hover }">
          <div data-aos="flip-down">
            <v-card
              :to="card.link"
              class="pa-md-6 mx-lg-auto"
              :elevation="hover ? 12 : 2"
              :class="{ 'on-hover': hover }"
            >
              <v-img
                :src="card.src"
                class="white--text align-end"
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                height="200px"
              >
                <v-card-title v-text="card.title"></v-card-title>
              </v-img>
            </v-card>
          </div>
        </v-hover>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    cards: [
      {
        title: "Accelerator",
        src:
          "https://res.cloudinary.com/airgyaan/image/upload/v1601389064/accelerator_vkjdlj.png",
        flex: 4,
        link: "/category/accelerator",
      },
      {
        title: "Actor",
        src:
          "https://res.cloudinary.com/airgyaan/image/upload/v1601446730/actor_ef9gxc.png",
        flex: 4,
        link: "/category/actor",
      },
      {
        title: "Angel Investor",
        src:
          "https://res.cloudinary.com/airgyaan/image/upload/v1601446729/angel_investor_d6rylu.png",
        flex: 4,
        link: "/category/angel_investor",
      },
      {
        title: "Artificial Intelligence",
        src:
          "https://res.cloudinary.com/airgyaan/image/upload/v1601446729/artificial_intelligence_fgiu5s.png",
        flex: 4,
        link: "/category/artificial_intelligence",
      },
      {
        title: "Baby Care",
        src:
          "https://res.cloudinary.com/airgyaan/image/upload/v1601446731/baby_care_vbzup5.png",
        flex: 4,
        link: "/category/baby_care",
      },
      {
        title: "Brands",
        src:
          "https://res.cloudinary.com/airgyaan/image/upload/v1601446729/brands_aa22nv.png",
        flex: 4,
        link: "/category/brands",
      },
      {
        title: "Business Consultant",
        src:
          "https://res.cloudinary.com/airgyaan/image/upload/v1601446730/business_consultant_rlbqkl.png",
        flex: 4,
        link: "/category/business_consultant",
      },
      {
        title: "Chartered Accountant",
        src:
          "https://res.cloudinary.com/airgyaan/image/upload/v1601446731/chartered_accountant_dhnsrq.png",
        flex: 4,
        link: "/category/chartered_accountant",
      },
      {
        title: "Civil Service",
        src:
          "https://res.cloudinary.com/airgyaan/image/upload/v1601446732/civil_service_epipz1.png",
        flex: 4,
        link: "/category/civil_service",
      },
      {
        title: "Comedian",
        src:
          "https://res.cloudinary.com/airgyaan/image/upload/v1601446732/comedian_fycgoy.png",
        flex: 4,
        link: "/category/comedian",
      },
      {
        title: "Dancer",
        src:
          "https://res.cloudinary.com/airgyaan/image/upload/v1601446731/dance_l1vq3w.png",
        flex: 4,
        link: "/category/dancer",
      },
      {
        title: "Developer",
        src:
          "https://res.cloudinary.com/airgyaan/image/upload/v1601446731/developer_butqig.png",
        flex: 4,
        link: "/category/developer",
      },
      {
        title: "Digital Marketer",
        src:
          "https://res.cloudinary.com/airgyaan/image/upload/v1601446732/digital_marketer_dpqxbk.png",
        flex: 4,
        link: "/category/digital_marketer",
      },
      {
        title: "English Speaking",
        src:
          "https://res.cloudinary.com/airgyaan/image/upload/v1601446732/english_speaking_dh0rf2.png",
        flex: 4,
        link: "/category/english_speaking",
      },
      {
        title: "Finance",
        src:
          "https://res.cloudinary.com/airgyaan/image/upload/v1601446732/finance_wyxfbk.png",
        flex: 4,
        link: "/category/finance",
      },
      {
        title: "Graphic Designer",
        src:
          "https://res.cloudinary.com/airgyaan/image/upload/v1601446734/graphic_designer_tliiek.png",
        flex: 4,
        link: "/category/graphic_designer",
      },
      {
        title: "Incubation",
        src:
          "https://res.cloudinary.com/airgyaan/image/upload/v1601446735/incubation_jsga42.png",
        flex: 4,
        link: "/category/incubation",
      },
      {
        title: "Lawyer",
        src:
          "https://res.cloudinary.com/airgyaan/image/upload/v1601446734/lawyer_b3pjzc.png",
        flex: 4,
        link: "/category/lawyer",
      },
      {
        title: "Machine Learning",
        src:
          "https://res.cloudinary.com/airgyaan/image/upload/v1601446735/machine_learning_a5tojt.png",
        flex: 4,
        link: "/category/machine_learning",
      },
      {
        title: "Model",
        src:
          "https://res.cloudinary.com/airgyaan/image/upload/v1601446735/model_oy1ak9.png",
        flex: 4,
        link: "/category/model",
      },
      {
        title: "Motivational",
        src:
          "https://res.cloudinary.com/airgyaan/image/upload/v1601446735/motivational_neo7y3.png",
        flex: 4,
        link: "/category/motivational",
      },
      {
        title: "News & Media",
        src:
          "https://res.cloudinary.com/airgyaan/image/upload/v1601446734/news_media_losld6.png",
        flex: 4,
        link: "/category/news&media",
      },
      {
        title: "Nutritionist",
        src:
          "https://res.cloudinary.com/airgyaan/image/upload/v1601446736/nutritionist_s8zls8.png",
        flex: 4,
        link: "/category/nutritionist",
      },
      {
        title: "Online Event",
        src:
          "https://res.cloudinary.com/airgyaan/image/upload/v1601446736/online_event_efjpgv.png",
        flex: 4,
        link: "/category/online_event",
      },
      {
        title: "Personal Blog",
        src:
          "https://res.cloudinary.com/airgyaan/image/upload/v1601446736/personal_blog_jylxdf.png",
        flex: 4,
        link: "/category/personal_blog",
      },
      {
        title: "Quotes",
        src:
          "https://res.cloudinary.com/airgyaan/image/upload/v1601446736/quotes_ma289u.png",
        flex: 4,
        link: "/category/quotes",
      },
      {
        title: "Rapper",
        src:
          "https://res.cloudinary.com/airgyaan/image/upload/v1601446736/rapper_mhty6e.png",
        flex: 4,
        link: "/category/rapper",
      },
      {
        title: "Shayar/Poet",
        src:
          "https://res.cloudinary.com/airgyaan/image/upload/v1601451528/poet_u5nxs0.png",
        flex: 4,
        link: "/category/accelerator",
      },
      {
        title: "Singer",
        src:
          "https://res.cloudinary.com/airgyaan/image/upload/v1601446737/singer_bnh6jn.png",
        flex: 4,
        link: "/category/singer",
      },
      {
        title: "Startup Mentor",
        src:
          "https://res.cloudinary.com/airgyaan/image/upload/v1601446738/startup_mentor_xsnpyo.png",
        flex: 4,
        link: "/category/startup_mentor",
      },
      {
        title: "Stock/Share Market",
        src:
          "https://res.cloudinary.com/airgyaan/image/upload/v1601446737/stock_market_jfroxi.png",
        flex: 4,
        link: "/category/stock_market",
      },
      {
        title: "Tech Guy",
        src:
          "https://res.cloudinary.com/airgyaan/image/upload/v1601446738/tech_guy_liefap.png",
        flex: 4,
        link: "/category/tech_guy",
      },
      {
        title: "Venture Capital",
        src:
          "https://res.cloudinary.com/airgyaan/image/upload/v1601446738/venture_capital_fwifsm.png",
        flex: 4,
        link: "/category/venture_capital",
      },
      {
        title: "Women Empowerment",
        src:
          "https://res.cloudinary.com/airgyaan/image/upload/v1601455199/women_empowerment_rooaux.png",
        flex: 4,
        link: "/category/women_empowerement",
      },
      {
        title: "Writer",
        src:
          "https://res.cloudinary.com/airgyaan/image/upload/v1601446739/writer_gazzul.png",
        flex: 4,
        link: "/category/writer",
      },
    ],
  }),
};
</script>

<style scoped>
.v-card {
  transition: opacity 0.4s ease-in-out;
}
.v-card:not(.on-hover) {
  opacity: 0.8;
}
</style>
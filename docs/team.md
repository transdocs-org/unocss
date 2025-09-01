---
layout: page
title: 认识团队
description: UnoCSS 的开发由一个国际化的团队指导。
---

<script setup>
import {
  VPTeamPage,
  VPTeamPageTitle,
  VPTeamPageSection,
  VPTeamMembers
} from 'vitepress/theme'
import { teamMembers, teamEmeritiMembers } from './.vitepress/contributors'
</script>

<VPTeamPage>
  <VPTeamPageTitle>
    <template #title>认识团队</template>
    <template #lead>
      UnoCSS 的开发由一个国际化的团队指导，其中一些成员选择在下方展示他们的信息。
    </template>
  </VPTeamPageTitle>
  <VPTeamMembers :members="teamMembers" />
  <VPTeamPageSection>
    <template #title>荣誉团队成员</template>
    <template #lead>
      在这里，我们向一些已不再活跃但曾做出宝贵贡献的前团队成员致敬。
    </template>
    <template #members>
      <VPTeamMembers size="small" :members="teamEmeritiMembers" />
    </template>
  </VPTeamPageSection>
</VPTeamPage>
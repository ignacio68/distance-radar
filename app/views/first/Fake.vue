<template>
  <Page class="page">
    <ActionBar
      title="Home"
      class="action-bar"
    />
    <ScrollView>
      <StackLayout class="home-panel">
        <!--Add your page content here-->
        <Label
          textWrap="true"
          text="FAKE PAGE!!!"
          class="h2 description-label"
          color="black"
        />
      </StackLayout>
    </ScrollView>
  </Page>
</template>

<script>
export default {
    name: 'Fake',
    data () {
        return {
        };
    },
}
</script>

<style scoped>
.home-panel {
    vertical-align: center;
    font-size: 20;
    margin: 15;
    color: black;
}

.description-label {
    margin: 15;
}
</style>


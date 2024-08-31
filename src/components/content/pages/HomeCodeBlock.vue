<script lang="ts">
export default {}
</script>

<template>
  <p class="main">
    <span class="code-orange">func</span>
    <span class="code-violet"> main()</span> {
  </p>
  <p class="intent-L1">
    lis, err <span class="code-blue">:= </span> net.<span class="code-violet">Listen</span>(
    <span class="code-blue">"tcp"</span>, <span class="code-blue">"localhost:5400"</span>)
  </p>
  <p class="intent-L1">
    <span class="code-orange">if</span> err <span class="code-blue">! = nil</span> {
  </p>
  <p class="intent-L2">
    log.<span class="code-violet">Fatalf</span>(
    <span class="code-blue">"Failed to listen: %v"</span>, err)
  </p>
  <p class="intent-L1">}</p>
  <p class="intent-L1"><span class="code-orange">var</span> opts []grpc.ServerOption</p>
  <p class="intent-L1">
    grpcServer
    <span class="code-blue">:=</span>
    grpc.<span class="code-violet">NewServer</span>(opts<span class="code-blue">...</span>)
  </p>
  <p class="intent-L1">
    chat.<span class="code-violet">RegisterChatServiceServer</span>(grpcServer,
    <span class="code-blue">&</span>Server{
  </p>
  <p class="intent-L2">
    channel: <span class="code-violet">make</span> (<span class="code-orange">map</span>[string][]
    <span class="code-blue">*</span>chat.User),
  </p>
  <p class="intent-L2">Connection: []<span class="code-blue">*</span>Connection{},</p>
  <p class="intent-L1">})</p>
  <p class="intent-L1">grpcServer.<span class="code-violet">Serve</span>(lis)</p>
  <p>}</p>
</template>

<style scoped>
p {
  color: #e5e9f0;
  padding: 0;
  margin: 0;
  font-size: 11px;
}
</style>

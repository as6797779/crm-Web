<template>
	<div id="loginApp">
		<el-col :span="12" :offset="3">
			<div class="grid-content bg-purple">
				<el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px"
					class="demo-ruleForm">
					<el-form-item label="密码" prop="logname">
						<el-input type="text" v-model="ruleForm.logname" autocomplete="off"></el-input>
					</el-form-item>
					<el-form-item label="年龄" prop="password">
						<el-input v-model="ruleForm.password"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
						<el-button @click="resetForm('ruleForm')">重置</el-button>
					</el-form-item>
				</el-form>
			</div>
		</el-col>
	</div>
</template>

<script>
	export default {
		data() {
			let checkLogname = (rule, value, callback) => {
				if (!value) {
					return callback(new Error('登录名不能为空'));
				} else {
					callback();
				}
			};
			let validatePass = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请输入密码'));
				} else {
					callback();
				}
			};
			return {
				ruleForm: {
					logname: '',
					password: ''
				},
				rules: {
					logname: [{
						validator: checkLogname,
						trigger: 'blur'
					}],
					password: [{
						validator: validatePass,
						trigger: 'blur'
					}]
				}
			};
		},
		methods: {
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						alert('submit!');
						this.$axios.post('login', this.$qs.stringify(this.ruleForm)).then(Response => {
							console.log(Response)
							let resheaders = Response.headers
							if (resheaders.token) {
								window.sessionStorage.setItem('token', resheaders.token)
                this.$store.commit('setLogname',this.ruleForm.logname)
								this.$router.push('/home')
							}
						}, error => {
							console.log(error)
						})
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			resetForm(formName) {
				this.$refs[formName].resetFields();
			}
		}
	}
</script>

<style scoped>
	#loginApp {
		margin-top: 350px;
	}
</style>

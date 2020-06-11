<template>
    <div>
        <!-- <div class="page-header">
			<span>安全声明</span>
		</div> -->
		<div class="page-content">
			<p class="title-text">{{ contentTitle }}</p>
            <div class="content-text">
                <p>{{ contentText1 }}</p>
                <p class="marginTop30">{{ contentText2 }}</p>
                <p class="marginTop60">{{ contentText3 }}</p>
                <p class="marginTop60">{{ contentText4 }}</p>
                <p class="marginTop60">{{ contentText5 }}</p>
                <p class="marginTop60">{{ contentText6 }}</p>
                <p class="marginTop30">{{ contentText7 }}</p>
                <p class="marginTop30">{{ contentText8 }}</p>
                <p class="marginTop30">{{ contentText9 }}</p>
                <p>{{ contentText10 }}</p>
                <p class="marginTop30">{{ contentText11 }}</p>
                <p class="marginTop30">{{ contentText12 }}</p>
                <p>{{ contentText13 }}</p>
                <p>{{ contentText14 }}</p>
                <p class="marginTop30">{{ contentText15 }}</p>
                <p>{{ contentText16 }}</p>
                <p class="marginTop30">{{ contentText17 }}</p>
                <p>{{ contentText18 }}</p>
                <p>{{ contentText19 }}</p>
                <p class="marginTop30">{{ contentText20 }}</p>
                <p class="marginTop30">{{ contentText21 }}</p>
            </div>
		</div>
    </div>
</template>

<script>
export default {
    components: {
    },
    data() {
        return {
            contentTitle: '安全声明',
            contentText1: '一、安全性声明',
            contentText2: '1.解放号利用了当今先进的部分互联网安全技术。当您通过行业标准安全套接字层 (SSL) 技术访问我们的网站时，您的信息会通过服务器验证和数据加密保护，确保您的数据安全无虞，而且仅您单位的注册用户可以访问。 您的竞争对手将完全无法访问您的数据。',
            contentText3: '2.解放号会向个人用户及企业用户提供唯一的账户（用户名和密码），用户登录时必须输入。 解放号会发出一个会话“Cookie”，该 Cookie 仅会在特定会话期间记录加密身份验证信息。会话“Cookie”不包含用户的用户名或密码。 解放号不会使用“Cookie”存储其他用户和会话机密信息，而是会实施基于动态数据和编码会话 ID 更加高级的安全方法。',
            contentText4: '3.解放号托管于配备有防火墙和其他高级技术的安全服务器环境中，避免外部入侵者干扰或访问。',
            contentText5: '4.如果安全调查机构欲了解有关如何将安全性问题报告给 解放号的信息，应查看我们的漏洞报告策略。',
            contentText6: '二、漏洞报告策略',
            contentText7: '解放号安全团队深知独立安全研究机构在 Internet 安全领域内的重要作用。确保客户数据安全是我们的首要职责，我们鼓励大家负责任地报告我们的站点或应用程序内可能存在的任何漏洞。解放号将全力与安全社区合作，验证报告给我们的所有潜在漏洞并给予响应。另外，对于侵入或试图侵入我们系统的任何安全调查机构，只要他们遵守下述条件，解放号保证不针对他们发起任何法律诉讼。',
            contentText8: '1.报告潜在的安全性漏洞',
            contentText9: '(1) 通过发送电子邮件至 security@jfh.com 将可疑安全性漏洞的详细信息秘密告知 解放号；',
            contentText10: '(2) 提供可疑漏洞的完整详细信息，以便 解放号安全团队能够验证并重现该问题。',
            contentText11: '2.解放号不允许下列类型的安全性调查',
            contentText12: '(1) 导致或尝试导致拒绝服务 (DoS) 状况；',
            contentText13: '(2) 访问或尝试访问不属于您的数据或信息；',
            contentText14: '(3) 损害/摧毁或尝试损害/摧毁不属于您的数据或信息。',
            contentText15: '3.解放号安全团队承诺',
            contentText16: '对于遵循此解放号漏洞报告策略的所有安全调查机构，解放号安全团队承诺如下事项：',
            contentText17: '(1) 及时响应，确认收到您的报告；',
            contentText18: '(2) 提供解决该漏洞的预计时间范围；',
            contentText19: '(3) 修复漏洞后通知报告者。',
            contentText20: '4.不提供赔偿全调查',
            contentText21: '解放号不会向报告安全性漏洞的任何人给予赔偿，如要求给予赔偿则被视为违反上述条件。此时，解放号将保留其全部法律权利。'
        }
    },
    created(){
        document.title = '安全声明';
        window.scrollTo(0,0);
    },
    computed: {
    },
    methods: {
    },
}
</script>

<style scoped>
.page-header {
	padding: 2rem 0 0.7rem;
	text-align: center;
	font-size: 0.8rem;
	background-color: #ffffff;
}
.page-content {
	/* margin: 0.7rem 0.7rem 1rem; */
	padding: 1rem 1.4rem;
	background-color: #ffffff;
	border-radius: 0.4rem;
}
.title-text {
    color: #333333;
    font-size: 0.9rem;
}
.content-text {
    margin-top: 0.75rem;
    color: #555555;
    font-size: 0.7rem;
}
.marginTop30 {
    margin-top: 0.75rem;
}
.marginTop60 {
    margin-top: 1.5rem;
}
</style>


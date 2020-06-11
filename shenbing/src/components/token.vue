
<template>
  


</template>

<script>
    import {util} from '@/libs/util.js';
    import API from '@/serve/index.js';
export default {
    name:"",
    data(){
      
        return {
      


        };
    },
    methods:{
         tokenTest:function(){
             let params = {
                        mobile:13811397929,
                        identityNumber:110108198409136332,
                        oftenProvicne:123,
                        userName:'王甲',
                        sex:'',
                        birthday:'',
                        companyId:'',
                        departmentName:'',
                        address:'',
                    };
                API('JSONPOST','/yjgcrest/feiyan/editvisitor',params).then( res => {
                        if(res.data.status == 200 && res.data.code == '000001'){
                           document.write(res.data)
                          console.log(res.data)
                        }
                    }).catch( error => {
                        console.log(error)
                    })
         }
    },
    components:{
     
    },
    computed:{},
    created(){

     
    },
    mounted(){
     this.tokenTest()
    }
}
</script>  
<template>
    <div>
        <el-card>
            <div style="text-align: center">
                <el-transfer
                    style="text-align: left; display: inline-block"
                    v-model="value4"
                    filterable
                    :left-default-checked="[2, 3]"
                    :right-default-checked="[1]"
                    :titles="['分类', '爱好']"
                    :button-texts="['到左边', '到右边']"
                    :format="{
        noChecked: '${total}',
        hasChecked: '${checked}/${total}'
      }"
                    @change="handleChange"
                    :data="data"
                >
                    <span slot-scope="{ option }">{{ option.key }} - {{ option.label }}</span>
                    <el-button class="transfer-footer" slot="left-footer" size="mini">操作</el-button>
                    <el-button class="transfer-footer" slot="right-footer" size="mini">操作</el-button>
                </el-transfer>
            </div>
        </el-card>
    </div>
</template>

<script>
export default {
    data () {
        const generateData = _ => {
            const data = [];
            for (let i = 1; i <= 15; i++) {
                data.push({
                    key: i,
                    label: `备选项 ${i}`,
                    disabled: i % 4 === 0
                });
            }
            return data;
        };
        return {
            data: generateData(),
            value: [1],
            value4: [1],
            renderFunc (h, option) {
                return <span>{option.key} - {option.label}</span>;
            }
        };
    },

    methods: {
        handleChange (value, direction, movedKeys) {
            console.log(value, direction, movedKeys);
        }
    }
}
</script>

<style>
</style>
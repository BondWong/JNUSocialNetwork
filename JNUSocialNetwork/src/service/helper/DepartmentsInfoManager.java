package service.helper;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class DepartmentsInfoManager {
	private static Map<Long, List<String>> departments = new HashMap<Long, List<String>>();
	static {
		// 暨南大学国际商学院团委学生会
		List<String> department1 = new ArrayList<String>();
		department1.add("人力资源部");
		department1.add("体育部");
		department1.add("信息编辑部");
		department1.add("公关部");
		department1.add("国际部");
		department1.add("学术部");
		department1.add("宣传部");
		department1.add("心理服务部");
		department1.add("文娱部");
		department1.add("社会实践部");
		department1.add("秘书处");
		department1.add("组织部");

		departments.put(1411055191107l, department1);

		// 管理学院
		/*
		 * List<String> department2 = new ArrayList<String>();
		 * 
		 * department2.add("秘书部"); department2.add("公关部");
		 * department2.add("人资部"); department2.add("学术部");
		 * department2.add("组织部"); department2.add("体育部");
		 * department2.add("宣传部"); department2.add("文娱部");
		 * department2.add("编辑部"); department2.add("心理部");
		 * department2.add("青年志愿者协会2.0");
		 * 
		 * departments.put(1411522941400l, department2);
		 */

		// 翻译学院
		List<String> department3 = new ArrayList<String>();

		department3.add("秘书处");
		department3.add("公关部");
		department3.add("心服部");
		department3.add("文体部");
		department3.add("编辑部");
		department3.add("组织部");
		department3.add("学术部");
		department3.add("宣传部");

		departments.put(1411054407457l, department3);

		// 社联
		List<String> department4 = new ArrayList<String>();

		department4.add("社团交流促进部");
		department4.add("信息部");
		department4.add("秘书处");
		department4.add("人力资源部");
		department4.add("公关部");
		department4.add("宣传部");
		department4.add("编辑部");

		departments.put(1411555413859l, department4);

		// 暨南大学职业发展协会珠海分会
		List<String> department5 = new ArrayList<String>();

		department5 = new ArrayList<String>();

		department5.add("行政部");
		department5.add("新闻部");
		department5.add("公关部");
		department5.add("人力资源部");
		department5.add("推广设计部");
		department5.add("项目统筹部");
		department5.add("企业交流部");
		department5.add("就业创业指导部");

		departments.put(1411397204271l, department5);

		// 团工委
		List<String> department6 = new ArrayList<String>();

		department6.add("行政部");
		department6.add("组织部");
		department6.add("宣传部");
		department6.add("社会实践部");
		department6.add("公关部");
		department6.add("学术科技部");
		department6.add("国旗护卫队");
		department6.add("形象大使团");
		department6.add("青年志愿者协会");
		department6.add("暨南人网络联盟");

		departments.put(1411090991902l, department6);

		// 暨南大学学生会珠海校区执行委员会
		List<String> department7 = new ArrayList<String>();

		department7.add("秘书处");
		department7.add("学生服务部");
		department7.add("外招生部");
		department7.add("宣传部");
		department7.add("编辑部");
		department7.add("体育部");
		department7.add("公关部");
		department7.add("心理服务部");
		department7.add("文娱部");
		department7.add("学习部");
		department7.add("人力资源部");

		departments.put(1411301318703l, department7);

		// 人文学院
		List<String> department8 = new ArrayList<String>();

		department8.add("秘书处");
		department8.add("组织部");
		department8.add("宣编部");
		department8.add("人力资源部");
		department8.add("文娱部");
		department8.add("体育部");
		department8.add("公关部");
		department8.add("学术事件部");

		// departments.put(0l, department8);

		// 电器信息学院
		List<String> department9 = new ArrayList<String>();

		department9.add("秘书处");
		department9.add("人力资源部");
		department9.add("体育部");
		department9.add("信息编辑部");
		department9.add("公关部");
		department9.add("学术部");
		department9.add("宣传部");
		department9.add("心理服务部");
		department9.add("文娱部");
		department9.add("组织部");
		department9.add("司仪队");
		department9.add("司仪队");

		departments.put(1411390027993l, department9);

	}

	public static List<String> get(Long communityID) {
		return departments.get(communityID);
	}
}

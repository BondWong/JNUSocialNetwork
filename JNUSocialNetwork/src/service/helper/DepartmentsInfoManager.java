package service.helper;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class DepartmentsInfoManager {
	private static Map<Long, List<String>> departments = new HashMap<Long, List<String>>();
	static {
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

		List<String> department2 = new ArrayList<String>();
		department2.add("秘书部");
		department2.add("公关部");
		department2.add("人资部");
		department2.add("学术部");
		department2.add("组织部");
		department2.add("体育部");
		department2.add("宣传部");
		department2.add("文娱部");
		department2.add("编辑部");
		department2.add("心理部");
		department2.add("青年志愿者协会");

		// departments.put(1411055191107l, department2);

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
	}

	public static List<String> get(Long communityID) {
		return departments.get(communityID);
	}
}

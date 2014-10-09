<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<div class="about_body">
	<div class="post about">
		<div class="aboutBlue">
			<div>
				<span class="aboutTitle">基本信息</span>
			</div>
			<div class="InforItem">
				<span class="Atitle">姓名</span><span class="Anickname"></span>
			</div>
			<div class="InforItem">
				<span class="Atitle">性别</span><span class="Agender"></span>
			</div>
			<div class="InforItem">
				<span class="Atitle">学院</span><span class="Ainstitution"></span>
			</div>
			<div class="InforItem">
				<span class="Atitle">专业</span><span class="Amajor"></span>
			</div>
			<div class="InforItem">
				<span class="Atitle">年级</span><span class="Aseason"></span><span>级</span>
			</div>
			<div class="InforItem">
				<span class="Atitle">校区</span><span class="Acampus"></span>
			</div>
		</div>
	</div>
	<div class="post about">
		<div class="aboutRed">
			<div>
				<span class="aboutTitle">个人信息
					<button class="btn btn-primary aEditbtn">编辑</button>
				</span>
			</div>
			<div class="InforItem">
				<div class='iAt'>
					<span class="Atitle">生日</span><span class="Abirth"></span>
				</div>
				<select class="selectAbout selectBirth"><option
						value="private">私密</option>
					<option value="public">公开</option></select>
			</div>
			<div class="InforItem">
				<div class='iAt'>
					<span class="Atitle">宿舍号</span><span class="Aaddress"></span>
				</div>
				<select class="selectAbout selectAddre"><option
						value="private">私密</option>
					<option value="public">公开</option></select>
			</div>
			<div class="InforItem">
				<div class='iAt'>
					<span class="Atitle">电话</span><span class="Atelenum"></span>
				</div>
				<select class="selectAbout selectTele"><option
						class='private'>私密</option>
					<option class='public'>公开</option></select>
			</div>
			<div class="InforItem">
				<div class='iAt'>
					<span class="Atitle">邮箱</span><span class="Aemail"></span>
				</div>
				<select class="selectAbout selectEmail"><option
						class='private'>私密</option>
					<option class='public'>公开</option></select>
			</div>
			<div class="InforItem">
				<div class='iAt'>
					<span class="Atitle">微信</span><span class="Awechat"></span>
				</div>
				<select class="selectAbout selectWechat"><option
						class='private'>私密</option>
					<option class='public'>公开</option></select>
			</div>
		</div>
	</div>
	<div class="post about">
		<div class="aboutBlack">
			<div>
				<span class="aboutTitle">个人介绍
					<button class="btn btn-primary aEditbtn2">编辑</button>
				</span>
			</div>
			<div class="InforItem">
				<span class="Atitle">感情状态</span><span class="Arelationship"></span>
			</div>
			<div class="InforItem">
				<span class="Atitle">个人描述</span><span class="Alooking"></span>
			</div>
		</div>
	</div>
	<div class="post about">
		<div class="aboutGreen">
			<div>
				<span class="aboutTitle">个性标签</span>
			</div>
			<div class="InforItem" id="inforTag">
				<div class="tags">
					<div class="tagBoard"></div>
					<span class="defaultTags"></span>
				</div>
				<div class="selectTags">
					<div class="tagHead">
						<span class="tagName">你现在状态是？</span> <input maxlength="8" type="text"
							class="tagInput" />
						<div class="btn-group btn-group-xs tagButton">
							<button class="btn btn-xs btn-default addTag">贴上</button>
							<button class="btn btn-xs btn-default changeTag">换一换</button>
						</div>
					</div>
					<div class="tagContainer">
						<span id="tagSpan" title="单身待解救">单身待解救</span>
						<span id="tagSpan" title="奋斗ing">奋斗ing</span>
						<span id="tagSpan" title="幸福ing">幸福ing</span>
						<span id="tagSpan" title="成长ing">成长ing</span>
						<span id="tagSpan" title="缺爱ing">缺爱ing</span>
						<span id="tagSpan" title="静待缘分">静待缘分</span>
						<span id="tagSpan" title="心如止水">心如止水</span>
						<span id="tagSpan" title="寂寞ing">寂寞ing</span>
						<span id="tagSpan" title="求职ing">求职ing</span>
						<span id="tagSpan" title="考研ing">考研ing</span>
						<span id="tagSpan" title="备战雅思">备战雅思</span>
						<span id="tagSpan" title="备战托福">备战托福</span>
						<span id="tagSpan" title="我是小鲜肉">我是小鲜肉</span>
						<br clear="all" /> 
					</div>
				</div>
			</div>
			<br clear="all" /> 
		</div>
	</div>
</div>

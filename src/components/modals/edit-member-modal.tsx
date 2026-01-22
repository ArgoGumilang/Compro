import React, { useEffect, useState } from "react";
import { Modal } from "../ui/modal";
import { Button } from "../ui/button";
import { updateUser } from "../../lib/api";

interface Member {
  id: number;
  username: string;
  full_name?: string;
  email?: string;
  role_id?: number;
  role?: { id:number,name:string };
}

interface Props {
  isOpen: boolean;
  member?: Member;
  onClose: ()=>void;
  onSave: (updatedMember: Member)=>void;
}

export const EditMemberModal: React.FC<Props> = ({isOpen, member, onClose, onSave})=>{
  const [formData, setFormData] = useState<Member | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(()=>{
    if(isOpen && member){
      setFormData(member);
    }
  },[isOpen, member]);

  if(!isOpen) return null;
  if(!formData) return <Modal isOpen={isOpen} onClose={onClose} title="Edit Anggota"><p>Loading...</p></Modal>;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement|HTMLSelectElement>)=>{
    const {name,value} = e.target;
    setFormData(prev=>prev?{...prev,[name]:name==="role_id"?Number(value):value}:prev);
  };

  const handleSubmit = async (e: React.FormEvent)=>{
    e.preventDefault();
    if(!formData) return;
    try{
      setLoading(true);
      await updateUser(formData.id, {
        username: formData.username,
        full_name: formData.full_name,
        email: formData.email,
        role_id: formData.role_id
      });
      const updatedMember = {
        ...formData,
        role: { id: formData.role_id || 0, name: formData.role_id===1?"Admin":formData.role_id===2?"Guru":"Siswa" }
      };
      onSave(updatedMember);
      onClose();
    }catch(err){console.error(err); alert("Gagal menyimpan");}
    finally{setLoading(false);}
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Anggota">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label>Username</label>
          <input name="username" value={formData.username} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg"/>
        </div>
        <div>
          <label>Nama Lengkap</label>
          <input name="full_name" value={formData.full_name||""} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg"/>
        </div>
        <div>
          <label>Email</label>
          <input name="email" type="email" value={formData.email||""} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg"/>
        </div>
        <div>
          <label>Role</label>
          <select name="role_id" value={formData.role_id} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg">
            <option value={1}>Admin</option>
            <option value={2}>Guru</option>
            <option value={3}>Siswa</option>
          </select>
        </div>
        <div className="flex justify-end gap-2 pt-4 border-t">
          <Button variant="outline" onClick={onClose}>Batal</Button>
          <Button type="submit" disabled={loading}>{loading?"Menyimpan...":"Simpan"}</Button>
        </div>
      </form>
    </Modal>
  );
};
